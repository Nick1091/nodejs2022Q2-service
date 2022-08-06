import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { comparePassword, setHashPassword } from 'src/common/utils';
import { plainToInstance } from 'class-transformer';
import { Users } from 'src/users/entities/user.entity';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { ERRORS_MSGS } from 'src/constants';
import {
  JWT_SECRET_KEY,
  JWT_SECRET_REFRESH_KEY,
  TOKEN_EXPIRE_TIME,
  TOKEN_REFRESH_EXPIRE_TIME,
} from 'src/common/config';
import { ITokens } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}
  async signup(dto: AuthDto) {
    const hash = await setHashPassword(dto.password);
    const date = new Date().toISOString();
    try {
      const user = await this.prisma.user.create({
        data: {
          ...dto,
          password: hash,
          updatedAt: date,
          createdAt: date,
        },
      });
      return plainToInstance(Users, user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'p2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  async login(dto: AuthDto): Promise<ITokens> {
    const user = await this.prisma.user.findFirst({
      where: {
        login: dto.login,
      },
    });
    if (!user) {
      throw new ForbiddenException(ERRORS_MSGS.BAD_LOGIN);
    }
    const pwMAtches = await comparePassword(dto.password, user.password);
    if (!pwMAtches) throw new ForbiddenException(ERRORS_MSGS.BAD_LOGIN);
    const tokens = await this.getTokens(user.id, user.login);

    await this.updateUserRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async getTokens(userId: string, login: string) {
    const payload = { login: login, sub: userId };
    return {
      accessToken: this.jwtService.sign(payload, {
        expiresIn: TOKEN_EXPIRE_TIME,
        secret: JWT_SECRET_KEY,
      }),
      refreshToken: this.jwtService.sign(payload, {
        expiresIn: TOKEN_REFRESH_EXPIRE_TIME,
        secret: JWT_SECRET_REFRESH_KEY,
      }),
    };
  }

  async decodeRt(refreshToken: string) {
    const isDecode = this.jwtService.decode(refreshToken);
    return isDecode;
  }
  async verifyJWT(token: string, secretJWT: string) {
    const dataToken = await this.jwtService.verify(token, {
      secret: secretJWT,
    });
    return dataToken;
  }
  verifyTokenJWT(token: string, secretJWT: string) {
    try {
      const dataToken = this.jwtService.verify(token, {
        secret: secretJWT,
      });
      console.log(dataToken);
      return true;
    } catch (err) {
      return null;
    }
  }

  async updateTokens(refreshToken: string) {
    const user = await this.prisma.user.findFirst({
      where: { refreshToken: refreshToken },
    });

    if (!user) throw new ForbiddenException(ERRORS_MSGS.EXPIRED_RF_TOKEN);
    const isVerify = await this.verifyJWT(refreshToken, JWT_SECRET_REFRESH_KEY);
    if (!isVerify) throw new ForbiddenException(ERRORS_MSGS.EXPIRED_RF_TOKEN);

    const tokens = await this.getTokens(user.id, user.login);

    await this.updateUserRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async updateUserRefreshToken(id: string, rt: string) {
    await this.prisma.user.update({
      where: { id },
      data: {
        refreshToken: rt,
      },
    });
  }
}
