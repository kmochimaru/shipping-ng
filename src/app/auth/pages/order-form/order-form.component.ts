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
  id: number;

  constructor(
    private _formBuilder: FormBuilder,
    private _ordersService: OrdersService,
    private _router: Router,
    private _activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.onInitForm();
    this._activateRoute.params.subscribe(params => {
      if (params.id) {
        this.id = params.id;
        this.onInitValue(params.id);
      }
    });
  }

  onInitForm(): void {
    this.form = this._formBuilder.group({
      order_code: ['', Validators.required],
      order_contact_name: [''],
      orders_item: this._formBuilder.array([])
    });
  }

  createItemForm(orderItem?: OrderItemModel): FormGroup {
    if (orderItem === undefined) {
      return this._formBuilder.group({
        order_item_id: [],
        order_item_product: ['', Validators.required],
        order_item_type: ['', Validators.required],
        order_item_qty: ['', Validators.required],
        order_item_unit: ['', Validators.required],
        order_item_price: ['', Validators.required],
      });
    } else {
      return this._formBuilder.group({
        order_item_id: [],
        order_item_product: [orderItem.order_item_product, Validators.required],
        order_item_type: [orderItem.order_item_type, Validators.required],
        order_item_qty: [orderItem.order_item_qty, Validators.required],
        order_item_unit: [orderItem.order_item_unit, Validators.required],
        order_item_price: [orderItem.order_item_price, Validators.required],
      });
    }

  }

  get ordersItemArray(): FormArray {
    return this.form.get('orders_item') as FormArray;
  }

  addItem(): void {
    const item: any = {};
    item.order_item_price = 1000;
    item.order_item_qty = 5;
    item.order_item_unit = '5555';
    item.order_item_product = '5555';
    item.order_item_type = '5555';
    this.ordersItemArray.push(this.createItemForm(item));
  }

  onSubmit(): void {
    if (this.form.valid) {
      if (!this.id) {
        this._ordersService.create(this.form.value).subscribe(response => {
          this._router.navigate(['', APP_URL.AUTH, AUTH_URL.USER_LIST]);
        });
      } else {
        this._ordersService.update(this.id, this.form.value).subscribe(response => {
          this._router.navigate(['', APP_URL.AUTH, AUTH_URL.USER_LIST]);
        });
      }
    }
  }

  onInitValue(id: number): void {
    this._ordersService.findOne(id).subscribe((response: OrderModel) => {
      // console.table(response);
      // this.form.get('ordername').setValue(response.ordername);
      for (const key of Object.keys(response)) {
        try {
          this.form.get(key).setValue(response[key]);
        } catch (ex) { }
      }
    });
  }

}
