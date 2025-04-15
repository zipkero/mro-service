import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { ApiConfigService } from './api.config';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env${process.env.NODE_ENV == 'production' ? '.production' : '.development'}`,
    }),
  ],
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class ConfigModule {}
