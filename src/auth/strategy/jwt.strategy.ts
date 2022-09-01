import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { JWT_SECRET_KEY } from 'src/common/config';
import { JwtPayload } from '../auth.interface';
import { AuthService } from '../auth.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private authService: AuthService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_SECRET_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const token = req?.get('authorization')?.replace('Bearer', '').trim();

    if (!token) {
      throw new UnauthorizedException();
    }
    const isVerify = await this.authService.verifyJWT(token, JWT_SECRET_KEY);
    if (!isVerify) {
      throw new UnauthorizedException();
    }
    return { id: payload.sub, login: payload.login };
  }
}
