import { Component, OnInit } from '@angular/core';
import { Artist } from '../../../models/artist';
import { UserService } from '../../../services/user.service';
import { ArtistService } from '../../../services/artist.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UploadService } from '../../../services/upload.service';

@Component({
  selector: 'app-edit-artist',
  templateUrl: '../create-artist/create-artist.component.html',
  providers: [ArtistService, UserService, UploadService]

})
export class EditArtistComponent implements OnInit {
  public title:string;
  public is_edit;
  public token;
  public artist;
  public fileToUpload;
  public message;
  constructor(
    private _userService: UserService,
    private _artistService: ArtistService,
    private _uploadService: UploadService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.artist = new Artist('','','')
    this.title = 'Edit Artist';
    this.is_edit = true;
    this.message = ''
    this.fileToUpload = null
    this.token = this._userService.getToken();
   }

  ngOnInit() {
    this.getArtist();
  }
  getArtist(){
    this._route.params.forEach((params: Params) => {
      let id = params['id']
      this._artistService.getArtist(id, this.token)
      .subscribe(response =>{

        if (!response.artist) {
            this._router.navigate(['/'])
        }
        else {
            this.artist = response.artist

        }
      },
      error =>{
        console.log(error)
      })
    })
  }
  onSubmit(){
    this._route.params.forEach((params: Params) => {
      let id = params['id']
      this._artistService.updateArtist(id, this.token, this.artist).subscribe(response =>{
          this.message = response.message
          if (this.fileToUpload != null) {
              this._uploadService.uploadFileToServer(`artists/add-image/${this.artist._id}`,'image', this.fileToUpload,
            this.token)
            .subscribe(response =>{

            },
            error =>{
              console.log(error)
            })
          }
          this._router.navigate(['/arstist',1])
      }
      ,error =>{
        console.log(error)
        this.message ="Error loading the artist"
      })
    })
  }
  loadFile(event){
    this.fileToUpload = <File>event.target.files[0]
  }
  getUrlPicture(){
    if (this.artist.image == null) {
      return ""
    }
    return this._artistService.getUrlPicture(this.artist.image);
  }
}
