import { OrderState } from './entities/order.entity';

export interface OrderStateHandlerInterface {
  next(orderState: OrderState): void;
}

export class CreatedOrderStateHandler implements OrderStateHandlerInterface {
  public acceptedStates: {
    ordered: () => 'Update DB, Notify Customer, etc.';
    cancelled: () => 'Update DB, Cancel order, Notify Customer, etc.';
  };

  next(orderState: OrderState): void {
    if (!this.acceptedStates[orderState]) {
      return;
    }

    this.acceptedStates[orderState]();
  }
}

export class OrderedOrderStateHandler implements OrderStateHandlerInterface {
  public acceptedStates: {
    sent: () => 'Update DB, Notify Customer is sent, etc.';
    cancelled: () => 'Update DB, Cancel order, Notify Customer, etc.';
  };

  next(orderState: OrderState): void {
    if (!this.acceptedStates[orderState]) {
      return;
    }

    this.acceptedStates[orderState]();
  }
}

export class SentOrderStateHandler implements OrderStateHandlerInterface {
  public acceptedStates: {
    delivered: () => 'Update DB, Notify Customer is delivered, etc.';
    cancelled: () => 'Update DB, Cancel order, Notify Customer, etc.';
  };

  next(orderState: OrderState): void {
    if (!this.acceptedStates[orderState]) {
      return;
    }

    this.acceptedStates[orderState]();
  }
}

export class CancelledOrderStateHandler implements OrderStateHandlerInterface {
  public acceptedStates: any;

  next(orderState: OrderState): void {
    console.log('PROCESS IS OVER', orderState);

    return;
  }
}
