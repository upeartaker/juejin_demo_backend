import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cat.entity';
import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { CatArtiEntity } from './catarticle.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity,CatArtiEntity])],
  controllers: [CatController],
  providers: [CatService],
  exports: [CatService],
})
export class CatModule {}
