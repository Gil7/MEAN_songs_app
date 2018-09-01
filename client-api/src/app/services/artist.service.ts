import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { UserService } from './user.service';

@Injectable()
export class ArtistService{
  public url: string;
  public token;
  constructor(private _http:HttpClient, private _userService: UserService){
    this.url = GLOBAL.url
    this.token = this._userService.getToken();
  }
  getArtists(){

    const headersWithToken = {
      headers: new HttpHeaders({
        'Authorization': this.token
      })
    }
    return this._http.get(`${this.url}artists`, headersWithToken)
    .pipe(map(res => res));
  }
}
