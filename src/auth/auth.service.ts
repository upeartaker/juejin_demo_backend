import { Injectable } from '@nestjs/common';
import { CatService } from '../cat/cat.service';

@Injectable()
export class AuthService {
  constructor(private readonly catService: CatService) {}

  async validateCat(username: string, pass: string): Promise<any> {
    console.log('22222');
    const user = await this.catService.findOne(username);
    if (user && user.passWord === pass) {
      return user;
    }
    return null;
  }
}
