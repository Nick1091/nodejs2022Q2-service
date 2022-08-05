import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ITokens } from './auth.interface';
import { AuthService } from './auth.service';
import { AuthDto, RefreshTokenDto } from './dto';
import { RefAuthGuard } from './strategy/refr-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(@Body() dto: AuthDto) {
    const user = await this.authService.signup(dto);
    return user;
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() dto: AuthDto): Promise<ITokens> {
    return await this.authService.login(dto);
  }

  @Post('refresh')
  @UseGuards(RefAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateTokens(@Body() dto: RefreshTokenDto) {
    return await this.authService.updateTokens(dto);
  }
}
