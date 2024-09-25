import * as common from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderState } from './entities/order.entity';

@common.Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @common.Post('/state')
  create(@common.Body() orderState: OrderState) {
    return this.orderService.updateOrderStatus(orderState);
  }
}
