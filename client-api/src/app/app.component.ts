import { Component, OnInit } from '@angular/core';
import { User } from "./models/user";
import { UserService } from './services/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [UserService ]
})
export class AppComponent implements OnInit{
  public title = 'Music App';
  public user: User;
  public identity;
  public token;
  public errorMessage: string;
  ngOnInit(){
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	console.log(this.token)
  	console.log(this.identity)
  }
  constructor(private _userService: UserService){
    this.user = new User('', '', '', '', '', 'ROLE_USER', '')
  }
  onSubmit(){
  	this._userService.singin(this.user).subscribe(response => {
  		this.identity = response.user
  		if(!this.identity._id) {
  			alert("this user has been not loguedin correctly")
  		}
  		else {
  			const userjson = JSON.stringify(this.identity)
  			//get token
  			this._userService.singin(this.user, 'true').subscribe(response => {
  				this.token = response.token			
  				if(this.token.lentgh <= 0) {
  					this.errorMessage = "Error in login(token)"
  				}
  				else {
  					localStorage.setItem('identity', JSON.stringify(this.identity))
  					localStorage.setItem('jwttoken', this.token)
  				}
  			},
  			error => {
  				this.errorMessage = error.error.message
  			})
  		}
  	}, 
  	error => {
  		this.errorMessage = error.error.message
  		if(this.errorMessage != null) {
  			console.log(error)
  		}
  		
  	})
  }
}
