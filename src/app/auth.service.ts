import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isUserLoggedIn: boolean = false;
  constructor(private http: HttpClient) {}

  doLogin(user: User) {
    this.http.post('http://localhost:8080/login', user).subscribe(val=>{
      console.log(val);
    });
  }

  getLogin(){
    this.http.get('http://localhost:8080/login').subscribe(val=>{
      console.log("is logged in");
    });
  }
}
