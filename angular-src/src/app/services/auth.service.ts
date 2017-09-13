import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthService {
  auth: any;
  user: any;

  constructor(
    private http: Http,
    
  ) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers:headers})
      .map(res => res.json());
  }
  
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers:headers})
      .map(res => res.json());
  }

  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.auth);
    return this.http.get('http://localhost:3000/users/profile', {headers:headers})
      .map(res => res.json());
  }

  searchOnTwitter(){
    let headers = new Headers();
    return this.http.get('http://localhost:3000/users/dashboard')
      .map(res => res.json());
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.auth = token;
  }

  //Função para conferir se o token disponivel no localStorage ainda é valido
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  //salva o token e os dados do usuario no localhost
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.auth = token;
    this.user = user;
  }

  logout(){
    localStorage.clear();
    this.auth = null;
    this.user = null;
  }

}
