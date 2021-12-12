import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CatEntity } from './cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleClass } from './cat.article';
@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepository: Repository<CatEntity>,
  ) {}

  findAll(): Promise<CatEntity[]> {
    return this.catRepository.find();
  }

  findOne(key: string): Promise<CatEntity> {
    return this.catRepository.findOne({ userName: key });
  }

  async remove(id: string): Promise<void> {
    await this.catRepository.delete(id);
  }

  async addOne(CatEntity: CatEntity): Promise<void> {
    const e = await this.catRepository.create({
      userName: CatEntity.userName,
      passWord: CatEntity.passWord,
      article: CatEntity.article,
    });
    this.catRepository.save(e);
  }

  async addArticle(useName: string, article: string): Promise<boolean> {
    const one = await this.catRepository.findOne({ userName: useName });

    one.article = article;

    if (this.catRepository.save(one)) {
      return true;
    } else {
      return false;
    }
  }

  // async delArticle(useName: string, artiName: string): Promise<boolean> {
  //   const one = await this.catRepository.findOne({ userName: useName });

  //   const artArray = (await one).article;
  //   const len = artArray.length;
  //   for (let i = 0; i < len; i++) {
  //     if (artArray[i].article === artiName) {
  //       artArray.splice(i, 1);
  //       this.catRepository.save(one);
  //       return true;
  //     }
  //   }
  //   return false;
  // }
}
