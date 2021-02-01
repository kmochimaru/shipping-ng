import { environment } from './../../../environments/environment';
import { ProductModel } from './../../models/product.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  ENV = environment;

  constructor(
    private _http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this._http.get(`${this.ENV.coreAPI}api/v1/products`);
  }

  findProductCategories(): Observable<any> {
    return this._http.get(`${this.ENV.coreAPI}api/v1/products/product-categories`);
  }

  findOne(id: number): Observable<any> {
    return this._http.get(`${this.ENV.coreAPI}api/v1/products/${id}`);
  }

  create(model: ProductModel): Observable<any> {
    return this._http.post(`${this.ENV.coreAPI}api/v1/products`, model);
  }

  update(id: number, model: ProductModel): Observable<any> {
    return this._http.put(`${this.ENV.coreAPI}api/v1/products/${id}`, model);
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${this.ENV.coreAPI}api/v1/products/${id}`);
  }
}
