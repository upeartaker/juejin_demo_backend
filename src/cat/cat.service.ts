import { Injectable } from '@nestjs/common';

import { Repository } from 'typeorm';
import { CatEntity } from './cat.entity';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class CatService {
  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepository: Repository<CatEntity>,
  ) {}

  findAll(): Promise<CatEntity[]> {
    return this.catRepository.find({ id: 11 });
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
}
