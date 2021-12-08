import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CatModule } from 'src/cat/cat.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtContants } from './jwt.contants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    CatModule,
    PassportModule,
    JwtModule.register({
      secret: jwtContants.secret,
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
