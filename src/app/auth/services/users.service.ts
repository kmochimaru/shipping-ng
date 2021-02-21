import { OptionsHttpGet } from './../../shared/interfaces/options-http-get.interface';
import { UserModel } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class UsersService {

  constructor(
    private _http: HttpClient
  ) { }

  findAll(options: OptionsHttpGet): Observable<any> {
    return this._http.get('http://localhost:3000/api/v1/users', options);
  }

  findOne(id: number): Observable<any> {
    return this._http.get(`http://localhost:3000/api/v1/users/${id}`);
  }

  create(model: UserModel): Observable<any> {
    return this._http.post('http://localhost:3000/api/v1/users', model);
  }

  update(id: number, model: UserModel): Observable<any> {
    return this._http.put(`http://localhost:3000/api/v1/users/${id}`, model);
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/api/v1/users/${id}`);
  }
}
