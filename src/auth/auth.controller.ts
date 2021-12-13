import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TokenEntity } from './token.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }
  //用户登录
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request): Promise<TokenEntity> {
    return this.authService.login(request.user);
  }
}
