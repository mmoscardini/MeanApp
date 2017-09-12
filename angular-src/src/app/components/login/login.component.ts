import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service'
import {Router} from '@angular/router'
import {FlashMessagesService} from 'angular2-flash-messages'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: String;
  password: String;
  passInputType: String = 'password';

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService

  ) { }

  ngOnInit() {
  }

  OnLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if (data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('Você foi logado com sucesso', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/profile']);       
      }else{
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/login']);
      }
    })
  }

  toggleHideShow(){
    if(this.passInputType == 'password'){
      this.passInputType = 'text';
    }
    else {
      this.passInputType = 'password';
    }
  }
}
