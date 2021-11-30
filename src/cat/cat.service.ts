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
}
