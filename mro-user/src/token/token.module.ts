import { Module } from '@nestjs/common';
import { TokenService } from './token.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule, JwtModule],
  exports: [TokenService],
  controllers: [],
  providers: [TokenService],
})
export class TokenModule {}
