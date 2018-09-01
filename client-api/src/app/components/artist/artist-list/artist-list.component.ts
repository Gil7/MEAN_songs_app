import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../../services/global';
import { Artist } from '../../../models/artist';
import { UserService } from '../../../services/user.service';
import { ArtistService } from '../../../services/artist.service';
@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.css'],
  providers: [UserService, ArtistService]
})
export class ArtistListComponent implements OnInit {
  public url: string;
  public title: string;
  public token;
  public identity;
  public artists: Artist[];
  constructor(private _userService: UserService,
    private _artistService: ArtistService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.title = 'Artists'
    this.url = GLOBAL.url,
    this.token = this._userService.getToken()
    this.identity = this._userService.getIdentity()
  }
  ngOnInit() {
    this._artistService.getArtists(this.token)
    .subscribe(response => {
      console.log(response)
    },
    error =>{
      console.log(error)
    })
  }

}
