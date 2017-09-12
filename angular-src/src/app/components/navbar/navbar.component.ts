import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private flashMessagem: FlashMessagesService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  logout(){
    if (this.authService.auth != null){
      this.flashMessagem.show('Você foi deslogado', {cssClass: 'alert-warning', timeout: 3000});
      this.authService.logout();
      this.router.navigate(['login']);
    }
  }
}
