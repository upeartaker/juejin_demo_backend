import { Body, Controller, Get, Post } from '@nestjs/common';
// import { get } from 'http';
import { CatEntity } from './cat.entity';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  // 获取所有用户信息
  @Get('alluser')
  findAll(): Promise<CatEntity[]> {
    return this.catService.findAll();
  }

  // 登录接口
  @Post('login')
  async logIn(@Body() userdto): Promise<string> {
    // console.log('1111');
    const mysqlInfo = await this.catService.findOne(userdto.userNameStr);
    if (mysqlInfo) {
      if (mysqlInfo.passWord === userdto.passwordStr) {
        return '登陆成功';
      }
    } else {
      return '用户名或密码不正确';
    }
  }

  //注册用户
  @Post('addone')
  async addOne(logInInfo: CatEntity): Promise<string> {
    const name = await this.catService.findOne(logInInfo.userName);
    if (name) {
      return '用户名已注册';
    } else {
      await this.catService.addOne(logInInfo);
      return '注册成功';
    }
  }
}
