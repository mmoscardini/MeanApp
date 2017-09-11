import { Component, OnInit } from '@angular/core';
import {ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';

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

  //serpre que importar um serviço precisa adicioná-lo ao construtor
  constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService) { }

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

    if (!this.validateService.ValidateEmail(user.email)){
      this.flashMessage.show('Email Invalido', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }
  }

}
