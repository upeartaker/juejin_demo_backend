import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
    this.authService = authService;
  }

  async validate(username: string, password: string): Promise<any> {
    console.log('22222');
    const user = await this.authService.validateCat(username, password);
    if (!user) {
      throw new UnauthorizedException('incorrect username or password');
    }
    return user;
  }
}
