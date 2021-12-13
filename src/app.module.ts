import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
// 引入数据库的及配置文件
import { TypeOrmModule } from '@nestjs/typeorm';
import { CatEntity } from './cat/cat.entity';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { jwtContants } from './auth/jwt.contants';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    CatModule,
    TypeOrmModule.forRoot(),
    AuthModule,
    JwtModule.register({
      secret: jwtContants.secret,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
})
export class AppModule {}
