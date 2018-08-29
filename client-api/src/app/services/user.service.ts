import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GLOBAL } from './global';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};
@Injectable()
export class UserService{
	public identity;
	public token;
	public url: string;
	constructor(private _http: HttpClient){
		this.url = GLOBAL.url
	}
	singin(user, gethash = null){
		if(gethash) {
			user['gethash'] = true
		}
		let json = JSON.stringify(user)
		let params =  json
		return this._http.post(`${this.url}users/login`, params, httpOptions)
			.pipe(map(res => res));
	}
	signup(new_user){
		const params = JSON.stringify(new_user)
		return this._http.post(`${this.url}users/register`, params, httpOptions)
		.pipe(map(res => res));
	}
	updateUser(user_to_update){
		const params = JSON.stringify(user_to_update)
		httpOptions.headers.append('Authorization', this.token)
		return this._http.put(`${this.url}users/${user_to_update._id}`, params, httpOptions)
		.pipe(map(res => res));
	}
	getIdentity(){
		const identity = JSON.parse(localStorage.getItem('identity'))
		if(identity != undefined) {
			this.identity = identity;
		}
		else {
			this.identity = null;
		}
		return this.identity;
	}
	getToken(){
		const token = localStorage.getItem('jwttoken')
		if(token != undefined) {
			this.token = token;
		}
		else {
			this.token = null;
		}
		return this.token;
	}
	
}