import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  search: String;
  tweets: Object;

  constructor(
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router, 
  ) { }

  ngOnInit() {
  }

  OnSearchSubmit(){
    const search = this.search;
    
    if(this.search){
      this.authService.searchOnTwitter().subscribe(tweets => {
        this.tweets = tweets.tweets.statuses;
        console.log(this.tweets);
      },
    err => {
      throw err;
    });
    }
  }

}
