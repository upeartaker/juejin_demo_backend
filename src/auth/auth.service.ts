import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CatEntity } from 'src/cat/cat.entity';
import { CatService } from '../cat/cat.service';
import { TokenEntity } from './token.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly catService: CatService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCat(username: string, pass: string): Promise<CatEntity> {
    const user = await this.catService.findOne(username);
    console.log('2222');
    if (user && user.passWord === pass) {
      return user;
    }
    return null;
  }

  async login(cat: CatEntity): Promise<TokenEntity> {
    const { id, userName } = cat;
    console.log('1111');
    return {
      token: this.jwtService.sign({ userName, sub: id }),
    };
  }
}
