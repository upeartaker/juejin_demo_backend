import { Controller, Get, Post } from '@nestjs/common';
import { CatEntity } from './cat.entity';
import { CatService } from './cat.service';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) { }

  @Get('allUser')
  findAll(): Promise<CatEntity[]> {
    return this.catService.findAll();
  }
  @Get('1')
  findOne(): Promise<CatEntity> {
    return this.catService.findOne('1');
  }

  @Get('test')
  test() {
    console.log('2');
    return this.catService.addOne();
  }

  @Post('add')
  addOne(): Promise<void> {
    return this.catService.addOne();
  }
}
