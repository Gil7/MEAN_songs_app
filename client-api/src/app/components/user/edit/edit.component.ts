import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
@Component({
  selector: 'user-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [UserService]
})
export class EditComponent implements OnInit {
  public identity;
  public user: User;
  public token;
  public title;
  public message;
  constructor(private _userService: UserService) {
    this.title = 'Edit your account'
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.user = this.identity
    this.message = ""
   }

  ngOnInit() {

  }
  onSubmit(){
    this._userService.updateUser(this.user).subscribe(response =>{
      this.message = response.message
    },
    error =>{
      console.log(error)
      if (error.error.message != undefined) {
          this.message = error.error.message
      }
    })
  }

}
