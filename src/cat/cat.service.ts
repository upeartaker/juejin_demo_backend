import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CatEntity } from './cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CatArtiEntity } from './catarticle.entity';
@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepository: Repository<CatEntity>,
    @InjectRepository(CatArtiEntity)
    private readonly catArticle: Repository<CatArtiEntity>,
  ) {}
  /*
   *@functionName:
   *@Author: 张浩楠
   *@Date: 2021-12-13 20:31:29
   *@param in:
   *@param out:
   *@return:
   *@Description: 查找一篇文章
   */
  findAnArticle(username: string, artiName: string): Promise<CatArtiEntity> {
    console.log('get articlename:%s', artiName);
    console.log('get username:%s', username);
    return this.catArticle.findOne({
      userName: username,
      articleName: artiName,
    });
  }
  /*
   *@functionName:
   *@Author: 张浩楠
   *@Date: 2021-12-13 20:47:29
   *@param in:
   *@param out:
   *@return:
   *@Description: 查找一个用户
   */
  findOne(username: string): Promise<CatEntity> {
    return this.catRepository.findOne({
      userName: username,
    });
  }
  /*
   *@functionName:
   *@Author: 张浩楠
   *@Date: 2021-12-13 20:50:06
   *@param in:
   *@param out:
   *@return:
   *@Description: 添加一个用户
   */
  async addOne(CatEntity: CatEntity): Promise<boolean> {
    const one = await this.catRepository.create({
      userName: CatEntity.userName,
      passWord: CatEntity.passWord,
    });
    if (this.catRepository.save(one)) {
      return true;
    } else {
      false;
    }
  }
  /*
   *@functionName:
   *@Author: 张浩楠
   *@Date: 2021-12-13 20:50:45
   *@param in:
   *@param out:
   *@return:
   *@Description: 添加一篇文章
   */
  async addArticle(article: CatArtiEntity): Promise<boolean> {
    const one = await this.catArticle.create({
      userName: article.userName,
      articleName: article.articleName,
      content: article.content,
    });

    if (this.catArticle.save(one)) {
      return true;
    } else {
      return false;
    }
  }
}
