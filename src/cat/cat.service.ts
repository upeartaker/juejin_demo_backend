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

  findOne(id: string): Promise<CatEntity> {
    return this.catRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.catRepository.delete(id);
  }

  async addOne(): Promise<void> {
    console.log('1');
    const e = await this.catRepository.create({
      name: 'zhangyu1',
      color: 'green',
      age: 18,
    });
    this.catRepository.save(e);
  }
}
