import { Controller, Post, UseGuards, Body } from '@nestjs/common';
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
    const articleClass = new CatArtiEntity();
    console.log(
      createCatDto.username,
      createCatDto.content,
      createCatDto.articlename,
    );
    articleClass.userName = createCatDto.username;
    articleClass.content = createCatDto.content;
    articleClass.articleName = createCatDto.articlename;

    return this.catService.addArticle(articleClass);
  }
}
