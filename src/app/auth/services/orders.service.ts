import { OrderModel } from './../../models/order.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class OrdersService {

  constructor(
    private _http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this._http.get('http://localhost:3000/api/v1/orders');
  }

  findOne(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/api/v1/orders/${id}`);
  }

  create(model: OrderModel): Observable<any> {
    return this._http.post('http://localhost:3000/api/v1/orders', model);
  }

  update(id: number, model: OrderModel): Observable<any> {
    return this._http.put(`http://localhost:3000/api/v1/orders/${id}`, model);
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/api/v1/orders/${id}`);
  }
}
