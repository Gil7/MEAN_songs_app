import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../../services/global';
import { Artist } from '../../../models/artist';
import { UserService } from '../../../services/user.service';
import { ArtistService } from '../../../services/artist.service';
@Component({
  selector: 'app-create-artist',
  templateUrl: './create-artist.component.html',
  styleUrls: ['./create-artist.component.css'],
  providers: [UserService, ArtistService]
})
export class CreateArtistComponent implements OnInit {
  public title: string;
  public artist:Artist;
  public identity;
  public token;
  public message;
  constructor(
    private _userService:UserService,
    private _artistService: ArtistService,
    private _route:ActivatedRoute,
    private _router: Router
  ) {
    this.title ='Register new artist'
    this.artist = new Artist('','','')
    this.token = this._userService.getToken()
    this.identity = this._userService.getIdentity()
    this.message = null
   }

  ngOnInit() {
  }
  onSubmit(){
    console.log(this.artist)
    this._artistService.addArtist(this.token, this.artist)
    .subscribe(response =>{
      console.log(response)
      if (!response.artist) {
          this.message = "Error saving th artist"
          this.artist = response.artist
      }
      else {
        this.message = response.message
      }
    },
    error =>{
      this.message = "Error saving th artist"
    })
  }
}
