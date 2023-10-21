import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginResponse } from '../../../models/api-response-models/login-response';
import { ErrorResponse } from '../../../models/api-response-models/error-response';
import { AuthService } from 'core';
import { LoginModel } from '../../../models/user-model';
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { MessageService } from 'primeng/api';
// import { LoginResponse } from '../../../models/api-response-models/login-response';
// import { ErrorResponse } from '../../../models/api-response-models/error-response';
// import { AuthService } from '../../../core/services/auth.service';
// import { LoginModel } from '../../../models/user-model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user: LoginModel = { username: '', password: '' };
  loading: boolean = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {}

  onSubmit(user: LoginModel) {
    this.loading = true;
    this.authService.login(user.username, user.password)
    // this.authService.doLogin(user).subscribe({
    //   next: (res) => {
    //     res = res as LoginResponse;
    //     localStorage.setItem('accessToken', res.accessToken);
    //     localStorage.setItem('user', JSON.stringify(res.user));
    //     this.loading = false;
    //     this.router.navigate(['']);
    //   },
    //   error: (err) => {
    //     const error: ErrorResponse = err.error;
    //     console.log('err', error);
    //     this.sendAlert(error.message);
    //     this.loading = false;
    //   },
    // });
  }

  sendAlert(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      sticky: true,
    });
  }
  // user: LoginModel = { username: '', password: '' };
  // loading: boolean = false;
  // constructor(
  //   private authService: AuthService,
  //   private router: Router,
  //   private messageService: MessageService
  // ) {}

  // onSubmit(user: LoginModel) {
  //   this.loading = true;
  //   this.authService.doLogin(user).subscribe({
  //     next: (res) => {
  //       res = res as LoginResponse;
  //       localStorage.setItem('accessToken', res.accessToken);
  //       localStorage.setItem('user', JSON.stringify(res.user));
  //       this.loading = false;
  //       this.router.navigate(['']);
  //     },
  //     error: (err) => {
  //       const error: ErrorResponse = err.error;
  //       console.log('err', error);
  //       this.sendAlert(error.message);
  //       this.loading = false;
  //     },
  //   });
  // }

  // sendAlert(message: string) {
  //   this.messageService.add({
  //     severity: 'error',
  //     summary: 'Error',
  //     detail: message,
  //     sticky: true,
  //   });
  // }
}
