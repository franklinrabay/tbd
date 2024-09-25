import { Injectable } from '@nestjs/common';
import { Order, OrderState } from './entities/order.entity';
import {
  CancelledOrderStateHandler,
  CreatedOrderStateHandler,
  OrderedOrderStateHandler,
  OrderStateHandlerInterface,
  SentOrderStateHandler,
} from './order-state.service';

@Injectable()
export class OrderService {
  findById(id: string): Order {
    return {
      id: id,
      user: 'Max Mustermann',
      state: OrderState.ORDERED,
      description: 'Dummy Order',
    };
  }

  updateOrderStatus(orderState: OrderState) {
    const order = this.findById('foo');

    const stateHandler = this.getStateHandler(order.state);

    stateHandler.next(orderState);
  }

  getStateHandler(orderState: OrderState): OrderStateHandlerInterface {
    let orderStateHandler: OrderStateHandlerInterface;

    if (orderState === OrderState.CREATED) {
      orderStateHandler = new CreatedOrderStateHandler();
    } else if (orderState === OrderState.ORDERED) {
      orderStateHandler = new OrderedOrderStateHandler();
    } else if (orderState === OrderState.SENT) {
      orderStateHandler = new SentOrderStateHandler();
    } else {
      orderStateHandler = new CancelledOrderStateHandler();
    }

    return orderStateHandler;
  }
}
