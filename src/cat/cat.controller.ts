import { Controller, Get, Post, UseGuards, Body } from '@nestjs/common';
// import { get } from 'http';
import { CatEntity } from './cat.entity';
import { CatService } from './cat.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateCatDto } from './create-cat-dto';
import { CatArtiEntity } from './catarticle.entity';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}
  // 注册用户
  @Post('addone')
  async addOne(@Body() createCatDto: CreateCatDto): Promise<string> {
    const name = await this.catService.findOne(createCatDto.registerstr);
    if (name) {
      return '用户名已注册';
    } else {
      const one = new CatEntity();
      one.userName = createCatDto.registerstr;
      one.passWord = createCatDto.registerpsd;
      this.catService.addOne(one);
      return '注册成功';
    }
  }
  // 用户获取一篇文章
  @UseGuards(AuthGuard('jwt'))
  @Post('getarticle')
  async getArticle(@Body() createCatDto: CreateCatDto): Promise<string> {
    console.log(createCatDto);
    const one = await this.catService.findAnArticle(
      createCatDto.username,
      createCatDto.articlename,
    );

    return one.content;
  }
  // 用户添加文章
  @UseGuards(AuthGuard('jwt'))
  @Post('addarticle')
  async addArticle(@Body() createCatDto: CreateCatDto): Promise<boolean> {
    const articleClass = new CatArtiEntity();

    articleClass.userName = createCatDto.username;
    articleClass.content = createCatDto.content;
    articleClass.articleName = createCatDto.articlename;

    return this.catService.addArticle(articleClass);
  }
}
