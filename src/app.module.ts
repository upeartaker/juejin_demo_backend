import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
// 引入数据库的及配置文件
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cat/cat.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
@Module({
  imports: [
    CatModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      database: 'test',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'z6609930',
      entities: [CatEntity],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
