import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenModule } from 'src/token/token.module';

@Module({
  imports: [TokenModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
