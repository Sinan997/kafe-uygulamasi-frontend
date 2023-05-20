import { Component } from '@angular/core';
import { User } from '../models/userModel';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  user: User = { username: '', password: '' };
  constructor(private authService: AuthService) {
    this.authService.getLogin()
  }
  onSubmit(user: User) {
    this.authService.doLogin(user);
  }

}
