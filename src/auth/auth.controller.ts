import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { TokenEntity } from './token.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
    this.authService = authService;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() request): Promise<any> {
    console.log('333');
    return this.authService.login(request.user);
  }
}
