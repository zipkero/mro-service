import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { AuthModule } from './auth/auth.module';
import { ApiConfigService } from './config/api.config';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, UserModule, ProductModule, OrderModule, AuthModule],
  controllers: [],
  providers: [ApiConfigService],
  exports: [ApiConfigService],
})
export class AppModule {}
