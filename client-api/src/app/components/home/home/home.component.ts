import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public title:string;
  constructor(private _router: Router,
    private _route: ActivatedRoute
    ) {
      this.title = 'Home'
     }

  ngOnInit() {
  }

}
