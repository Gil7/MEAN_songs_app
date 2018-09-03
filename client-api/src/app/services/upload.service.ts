import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs/operators'
import { Observable } from 'rxjs'
import { GLOBAL } from './global';
@Injectable()
export class UploadService {
  public url: string;
  constructor(
    private _http: HttpClient
  ) {
    this.url = GLOBAL.url
  }
  uploadFileToServer(urlResource:string, name: string, file: File, token: string){
    const fd = new FormData()
    fd.append(name, file, file.name)
    const headersWithToken = {
      headers: new HttpHeaders({
        'Authorization': token
      })

    }
    return this._http.post(`${this.url}${urlResource}`, fd, headersWithToken)
    .pipe(map(res => res))
  }
}
