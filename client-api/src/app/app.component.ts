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
  public user_register: User;
  public identity;
  public token;
  public errorMessage: string;
  public inLogin;
  ngOnInit(){
  	this.identity = this._userService.getIdentity();
  	this.token = this._userService.getToken();
  	this.inLogin = true;
  }
  constructor(private _userService: UserService){
    this.user = new User('', '', '', '', '', 'ROLE_USER', '')
    this.user_register = new User('', '', '', '', '', 'ROLE_USER', '')
  }
  onSubmit(){
  	console.log("login user")
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
  changeForm(value){
		this.inLogin = value
	}
 	logoutUser(){
		localStorage.clear()
		this.identity = null
		this.token = null
	}
	onSubmitRegister(){
		
		this._userService.signup(this.user_register).subscribe(response => {
			console.log(response)
			if(response.success) {
				this.inLogin = true
				this.errorMessage = "User created, its time to signig to the firt time :)"
			}
			else{
				this.errorMessage = response.message
			}
		},
		error => {
			console.log(error)
			const errorMessage = error.error.message
			if(errorMessage != null) {
				this.errorMessage = errorMessage
				console.log(errorMessage)
			}
		})
	}
}
