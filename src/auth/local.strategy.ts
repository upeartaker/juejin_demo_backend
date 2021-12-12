import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CatEntity } from 'src/cat/cat.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
    this.authService = authService;
  }

  async validate(username: string, password: string): Promise<CatEntity> {
    const user = await this.authService.validateCat(username, password);
    if (user) {
      return user;
    } else {
      throw new UnauthorizedException('incorrect username or password');
    }
  }
}
