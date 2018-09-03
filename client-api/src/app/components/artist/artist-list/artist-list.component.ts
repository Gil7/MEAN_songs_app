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
  public prev_page;
  public next_page;
  constructor(private _userService: UserService,
    private _artistService: ArtistService,
    private _router: Router,
    private _route: ActivatedRoute,
  ) {
    this.title = 'Artists'
    this.url = GLOBAL.url,
    this.token = this._userService.getToken()
    this.identity = this._userService.getIdentity()
    this.prev_page = 1;
    this.next_page = 1;
  }
  ngOnInit() {
    this._route.params.forEach((params:Params) =>{
      let page = +params['page']
      if (!page) {
          page = 1
      }
      else {
        this.next_page = page + 1
        this.prev_page = page -1
        if (this.prev_page == 0) {
            this.prev_page = 1
        }
      }
      this._artistService.getArtists(page,this.token)
      .subscribe(response => {
        console.log(response)
        if (!response.artists) {
            this._router.navigate(['/'])
        }
        else {
          this.artists = response.artists
        }
      },
      error =>{
        console.log(error)
      })
    })

  }
  loadPicture(source){
    if (source == null) {

    }
    return this._artistService.getUrlPicture(source);
  }

}
