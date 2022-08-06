import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { ERRORS_MSGS } from 'src/constants';
import { PrismaService } from 'src/prisma/prisma.service';
import { ITokens } from './auth.interface';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private prisma: PrismaService,
  ) {}
  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: AuthDto) {
    const user = await this.authService.signup(dto);
    return user;
  }
  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto): Promise<ITokens> {
    return await this.authService.login(dto);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async updateTokens(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException(ERRORS_MSGS.BAD_RT);
    }
    return this.authService.updateTokens(refreshToken);
  }
}
