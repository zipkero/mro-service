import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ConfigModule } from '../config/config.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [ConfigModule],
})
export class AuthModule {}
