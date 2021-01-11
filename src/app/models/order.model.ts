import { OrderItemModel } from './order-item.model';

export class OrderModel {
    order_id?: number;
    order_code: string;
    order_discount: number;
    order_subtotal: number;
    order_total: number;
    order_start_date: Date;
    order_end_date: Date;
    order_credit: number;
    order_project?: string;
    order_ref_no?: string;
    order_note?: string;
    order_status?: number;
    orders_item: OrderItemModel[];
    order_contact_company: string;
    order_contact_code: string;
    order_contact_branch?: string;
    order_contact_address: string;
    order_contact_tin?: string;
    order_contact_name: string;
    order_contact_email?: string;
    order_contact_phonenumber: string;
    order_seller: string;
}
