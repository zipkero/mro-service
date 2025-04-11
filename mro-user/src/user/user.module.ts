import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TokenModule } from 'src/token/token.module';
import { UserRepository } from './user.repository';

@Module({
  imports: [TokenModule],
  providers: [UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
