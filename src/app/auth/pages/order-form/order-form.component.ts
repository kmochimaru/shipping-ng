import { ProductsService } from './../../services/products.service';
import { OrdersItemService } from './../../services/orders-item.service';
import { OrderItemModel } from './../../../models/order-item.model';
import { OrderModel } from './../../../models/order.model';
import { AUTH_URL } from './../../auth-url';
import { APP_URL } from './../../../app-url';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from './../../services/orders.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  form: FormGroup;
  private _id: number;
  private _removeId = [];
  products: { product_name: string, product_category: string }[];

  constructor(
    private _formBuilder: FormBuilder,
    private _ordersService: OrdersService,
    private _ordersItemService: OrdersItemService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.onInitForm();
    this.products = this._productsService.findAll();

    this._activateRoute.params.subscribe(params => {
      if (params.id) {
        this._id = params.id;
        this.onInitValue(params.id);
      }
    });
  }

  onInitForm(): void {
    this.form = this._formBuilder.group({
      order_code: ['', Validators.required],
      order_start_date: [new Date(), Validators.required],
      order_contact_name: [''],
      order_contact_address: [''],
      order_contact_phonenumber: [''],
      order_seller: [''],
      order_subtotal: [0],
      order_total: [0, Validators.required],
      orders_item: this._formBuilder.array([])
    });
    if (!this._id) {
      this.addItem();
    }
    this.form.get('orders_item').valueChanges.subscribe(ordersItem => this.sumPrice(ordersItem));
  }

  createItemForm(orderItem?: OrderItemModel): FormGroup {
    if (orderItem === undefined) {
      return this._formBuilder.group({
        order_item_product: ['', Validators.required],
        order_item_type: ['', Validators.required],
        order_item_qty: [1, Validators.required],
        order_item_unit: [''],
        order_item_price: ['', Validators.required],
      });
    } else {
      return this._formBuilder.group({
        order_item_id: [orderItem.order_item_id],
        order_item_product: [orderItem.order_item_product, Validators.required],
        order_item_type: [orderItem.order_item_type, Validators.required],
        order_item_qty: [orderItem.order_item_qty, Validators.required],
        order_item_unit: [orderItem.order_item_unit],
        order_item_price: [orderItem.order_item_price, Validators.required],
      });
    }
  }

  get ordersItemArray(): FormArray {
    return this.form.get('orders_item') as FormArray;
  }

  addItem(): void {
    this.ordersItemArray.push(this.createItemForm());
  }

  removeItem(index: number): void {
    if (this._id) {
      this._removeId.push(this.ordersItemArray.controls[index].value.order_item_id);
    }
    this.ordersItemArray.removeAt(index);
  }

  sumPrice(items: OrderItemModel[]): void {
    this.form.get('order_total').setValue(0);
    for (const item of items) {
      this.form.get('order_total').setValue(this.form.get('order_total').value + (item.order_item_qty * item.order_item_price));
    }
  }

  async onSubmit(): Promise<void> {
    if (this.form.valid) {
      if (!this._id) {
        this._ordersService.create(this.form.value).subscribe(response => {
          this._router.navigate(['', APP_URL.AUTH, AUTH_URL.ORDER_LIST]);
        });
      } else {
        for (const id of this._removeId) {
          this._ordersItemService.delete(id).subscribe(response => { });
        }

        this._ordersService.update(this._id, this.form.value).subscribe(response => {
          this._router.navigate(['', APP_URL.AUTH, AUTH_URL.ORDER_LIST]);
        });
      }
    }
  }

  onInitValue(id: number): void {
    this.ordersItemArray.removeAt(0);
    this._ordersService.findOne(id).subscribe((response: OrderModel) => {
      for (const key of Object.keys(response)) {
        try {
          if (key === 'orders_item') {
            for (const item of response.orders_item) {
              this.ordersItemArray.push(this.createItemForm(item));
            }
          } else {
            this.form.get(key).setValue(response[key]);
          }
        } catch (ex) { }
      }
    });
  }

}
