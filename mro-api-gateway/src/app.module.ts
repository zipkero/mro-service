import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [UserModule, ProductModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
