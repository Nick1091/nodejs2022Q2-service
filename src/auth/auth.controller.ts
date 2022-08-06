import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  GetCurrentUser,
  GetCurrentUserId,
  Public,
} from 'src/common/decorators';
import { ITokens } from './auth.interface';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { RefAuthGuard } from './strategy/refr-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
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
  @UseGuards(RefAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async updateTokens(
    @GetCurrentUserId() userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.updateTokens(userId, refreshToken);
  }
}
