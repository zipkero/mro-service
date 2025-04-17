import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { ConfigModule } from '../config/config.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [ConfigModule],
})
export class UserModule {}
