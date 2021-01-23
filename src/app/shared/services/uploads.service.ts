import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UploadsService {
  ENV = environment;

  constructor(
    private readonly _http: HttpClient,
  ) { }

  async onUpload(file: File, type: string): Promise<{ path: string }> {
    const upload = new FormData();
    upload.append(type, file);
    return this._http.post(`${this.ENV.coreAPI}api/v1/uploads`, upload).toPromise() as Promise<{ path: string }>;
  }

  async onRemove(fileType: string, fileName: string): Promise<any> {
    return this._http
      .delete(`${this.ENV.coreAPI}api/v1/uploads/${fileType}/${fileName}`).toPromise();
  }
}
