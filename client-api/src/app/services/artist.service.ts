import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
import { UserService } from './user.service';
import { Artist } from '../models/artist';

@Injectable()
export class ArtistService{
  public url: string;
  public token;
  constructor(private _http:HttpClient, private _userService: UserService){
    this.url = GLOBAL.url;
  }
  getArtists(token){
    const headersWithToken = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    }
    return this._http.get(`${this.url}artists`, headersWithToken)
    .pipe(map(res => res));
  }
  addArtist(token, artist: Artist){
    const headersWithToken = {
      headers : new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': token
      })
    }
    const params = JSON.stringify(artist);
    console.log('params', params)
    return this._http.post(`${this.url}artists`, params, headersWithToken)
      .pipe(map(res =>res));
  }
}
