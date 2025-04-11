import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { ConfigModule } from '@nestjs/config';

@Global()
@Module({
  providers: [RedisService],
  exports: [RedisService],
  imports: [ConfigModule],
})
export class RedisModule {}
