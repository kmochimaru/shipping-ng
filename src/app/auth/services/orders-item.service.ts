import { OrderItemModel } from './../../models/order-item.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersItemService {

  constructor(
    private _http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this._http.get('http://localhost:3000/api/v1/orders-item');
  }

  findOne(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/api/v1/orders-item/${id}`);
  }

  create(model: OrderItemModel): Observable<any> {
    return this._http.post('http://localhost:3000/api/v1/orders-item', model);
  }

  update(id: number, model: OrderItemModel): Observable<any> {
    return this._http.put(`http://localhost:3000/api/v1/orders-item/${id}`, model);
  }

  delete(id: number): Observable<any> {
    console.log(id);
    return this._http.delete(`http://localhost:3000/api/v1/orders-item/${id}`);
  }
}
