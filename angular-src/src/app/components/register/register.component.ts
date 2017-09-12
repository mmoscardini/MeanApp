import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import {AuthService} from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  username: String;
  email: String;
  password: String;
  passInputType: String = 'password';  

  //serpre que importar um serviço precisa adicioná-lo ao construtor
  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router, 
  ) { }

  ngOnInit() {
  }

  OnRegisterSubmit(){
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }    

    //Required Fields
    if (!this.validateService.ValidateRegister(user)){
      this.flashMessage.show('Porfavor, preencha todos os campos', {cssClass: 'alert-danger ', timeout: 3000});
      return false;
    }

    //Validate email
    if (!this.validateService.ValidateEmail(user.email)){
      this.flashMessage.show('Email Invalido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    this.authService.registerUser(user).subscribe(data => {
      if (data.success){
        this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});        
        this.router.navigate(['/login']);
      }
      else {
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});        
        this.router.navigate(['/register']);
      }
    });
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
