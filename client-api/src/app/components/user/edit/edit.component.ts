import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { GLOBAL } from '../../../services/global'
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
  public url: string;
  public selectedFile: File;
  constructor(private _userService: UserService) {
    this.title = 'Edit your account'
    this.identity = this._userService.getIdentity()
    this.token = this._userService.getToken()
    this.user = this.identity
    this.message = ""
    this.selectedFile = null
    this.url = GLOBAL.url
   }

  ngOnInit() {

  }
  onSubmit(){
    this._userService.updateUser(this.user).subscribe(response =>{
      this.message = response.message
      if (!response.user) {
        this.message = "Error! We cant update your information"
      }
      else {
        this.message = response.message
        localStorage.setItem('identity', JSON.stringify(this.user))
        if (this.selectedFile != null) {
            this._userService.uploadPicture(this.selectedFile)
            .subscribe(response =>{
              console.log(response)
              this.user.image = response.image
              localStorage.setItem('identity', JSON.stringify(this.user))
            },
            error => {
              this.message = "Error subiendo la imagen :("
            })
        }
      }
    },
    error =>{
      console.log(error)
      if (error.error.message != undefined) {
          this.message = error.error.message
      }
    })
  }
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0]
  }
  getPicture(){
    return `${this.url}users/get-image/${this.user.image}`
  }

}
