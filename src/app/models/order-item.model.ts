import { OrderModel } from './order.model';

export class OrderItemModel {
    order_item_id?: number;
    order_item_price: number;
    order_item_qty: number;
    order_item_unit: string;
    order_item_product: string;
    order_item_type: string;
    orders: OrderModel;
}
