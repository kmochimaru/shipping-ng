import { Injectable } from '@angular/core';

@Injectable()
export class ProductsService {

  constructor() { }

  findAll(): { product_name: string, product_category: string }[] {
    return [
      { product_name: 'เลย์', product_category: 'ขนม' },
      { product_name: 'น้ำผลมะพร้าว', product_category: 'น้ำ' },
      { product_name: 'ชาไข่มุก', product_category: 'น้ำ' },
      { product_name: 'kitkat', product_category: 'ขนม' }
    ];
  }
}
