import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ArtistService } from '../../../services/artist.service';
import { UserService } from '../../../services/user.service';
import { Artist } from '../../../models/artist';
@Component({
  selector: 'app-detail-artist',
  templateUrl: './detail-artist.component.html',
  styleUrls: ['./detail-artist.component.css'],
  providers: [UserService, ArtistService]
})
export class DetailArtistComponent implements OnInit {
  public artist: Artist;
  public title: string;
  public identity;
  public token;
  constructor(
    private _artistService: ArtistService,
    private _userService: UserService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.title ="Details Artist"
    this.token = this._userService.getToken()
    this.identity = this._userService.getIdentity()
  }

  ngOnInit() {
    this._route.params.forEach((params: Params) =>{

      let id = params['id']
      console.log(id)
      this.getArtist(id)
    })
    
  }
  getArtist(id){
    this._artistService.getArtist(id, this.token).subscribe(
      response => {
        console.log("repsonse. ",response)
        this.artist =response.artist
      },
      error =>{
        console.log(error)
      }
    )
  }
  getUrlPicture(){
    if (this.artist.image == null) {
        return ''
    }
    return this._artistService.getUrlPicture(this.artist.image)
  }
}
