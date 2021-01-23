import { environment } from './../../../environments/environment';
import { AttachmentModel } from './../../models/attachment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AttachmentsService {
  ENV = environment;

  constructor(
    private _http: HttpClient
  ) { }

  findAll(): Observable<any> {
    return this._http.get(`${this.ENV.coreAPI}api/v1/attachments`);
  }

  findOne(id: number): Observable<any> {
    return this._http.get(`${this.ENV.coreAPI}api/v1/attachments/${id}`);
  }

  create(model: AttachmentModel): Observable<any> {
    return this._http.post(`${this.ENV.coreAPI}api/v1/attachments`, model);
  }

  update(id: number, model: AttachmentModel): Observable<any> {
    return this._http.put(`${this.ENV.coreAPI}api/v1/attachments/${id}`, model);
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${this.ENV.coreAPI}api/v1/attachments/${id}`);
  }
}
