import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
// import { get } from 'http';
import { CatEntity } from './cat.entity';
import { CatService } from './cat.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCatDto } from './create-cat-dto';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  @UseGuards(AuthGuard('jwt'))
  // 获取所有用户信息
  @Get('alluser')
  async findAll(): Promise<CatEntity[]> {
    return this.catService.findAll();
  }

  // 注册用户
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
  // 用户添加文章
  @UseGuards(AuthGuard('jwt'))
  @Post('addarticle')
  async addArticle(@Body() createCatDto: CreateCatDto): Promise<boolean> {
    console.log(createCatDto.username, createCatDto.artiInfo);
    return this.catService.addArticle(
      createCatDto.username,
      createCatDto.artiInfo,
    );
  }
}
