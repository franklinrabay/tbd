export class Order {
  id: string;
  description: string;
  user: string;
  state: OrderState;
}

export enum OrderState {
  CREATED = 'created',
  ORDERED = 'ordered',
  SENT = 'sent',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}
