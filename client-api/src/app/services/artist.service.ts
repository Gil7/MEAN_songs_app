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
  getArtists(page, token){
    const headersWithToken = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    }
    return this._http.get(`${this.url}artists/${page}`, headersWithToken)
    .pipe(map(res => res));
  }
  getArtist(id:string, token){
    const headersWithToken = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    }
    return this._http.get(`${this.url}artists/edit/${id}`, headersWithToken )
    .pipe(map(res => res ));
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
  updateArtist(id: string, token, artist){
    const headersWithToken = {
      headers : new HttpHeaders({
        'Content-Type':'application/json',
        'Authorization': token
      })
    }
    const params = JSON.stringify(artist)
    return this._http.put(`${this.url}artists/${id}`, params ,headersWithToken)
      .pipe(map(res => res));
  }
  removeArtist(id: string, token){
    const headersWithToken = {
      headers: new HttpHeaders({
        'Authorization': token,
        'Content-Type': 'application/json'
      })
    }
    return this._http.delete(`${this.url}artist/${id}`, headersWithToken)
      .pipe(map(res =>res))
  }
  getUrlPicture(picture:string){
    return `${this.url}artists/get-image/${picture}`
  }
}
