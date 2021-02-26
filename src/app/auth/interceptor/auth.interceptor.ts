import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<HttpEventType.Response>> {
        if (this._auth.getAuthenticated()) {
            const authReq = req.clone({
                setHeaders: { Authorization: `Bearer ${this._auth.getAuthenticated()}` }
            });
            return next.handle(authReq);
        }
        return next.handle(req);
    }

}
