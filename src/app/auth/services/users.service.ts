import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsersService {

  constructor(
    private _http: HttpClient
  ) { }

  getUsers() {
    return this._http.get('http://localhost:3000/api/v1/users');
  }
}
