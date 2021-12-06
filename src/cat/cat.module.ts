import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService],
})
export class CatModule {}
