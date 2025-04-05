import { Module } from '@nestjs/common';
import { ServiceController } from './service/service.controller';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  controllers: [ServiceController, OrderController],
  providers: [OrderService]
})
export class OrderModule {}
