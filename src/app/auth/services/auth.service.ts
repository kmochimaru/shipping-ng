import { UserModel } from './../../models/user.model';
import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  private accessKey = 'token';
  private rememberMeStatus = 'status';

  constructor(private _http: HttpClient) { }

  onLogin(data: { username: string, password: string }): Observable<any> {
    return this._http.post(`${environment.coreAPI}api/v1/auth/login`, data);
  }

  setAuthenticated(accessToken: string): void {
    this.isRememberMe !== 'false' ? localStorage.setItem(this.accessKey, accessToken) : sessionStorage.setItem(this.accessKey, accessToken);
  }

  getAuthenticated(): string {
    return this.isRememberMe !== 'false' ? localStorage.getItem(this.accessKey) : sessionStorage.getItem(this.accessKey);
  }

  // decodeToken(): UserModel {
  //   const user = jwt_decode(this.getAuthenticated());
  //   return user;
  // }

  clearAuthenticated(): void {
    this.isRememberMe !== 'false' ? localStorage.removeItem(this.accessKey) : sessionStorage.removeItem(this.accessKey);
    localStorage.removeItem(this.rememberMeStatus);
  }

  setRememberMe(status: boolean): void {
    localStorage.setItem(this.rememberMeStatus, status.toString());
  }

  get isRememberMe(): string {
    return localStorage.getItem(this.rememberMeStatus || false.toString());
  }
}
