import { VatOptions } from './../shared/enums/vat-options.enum';
import { AttachmentModel } from './attachment.model';

export class ProductModel {
    product_id?: number;
    product_code?: string;
    product_name: string;
    product_cost_note?: string;
    product_cost_price?: number;
    product_cost_vat: VatOptions;
    product_sell_note: string;
    product_sell_price: number;
    product_sell_vat: VatOptions;
    product_unit: string;
    product_category: string;
    product_stock_date: Date;
    product_stock_qty?: number;
    product_stock_price?: number;
    product_barcode?: string;
    attachments: AttachmentModel;
}
