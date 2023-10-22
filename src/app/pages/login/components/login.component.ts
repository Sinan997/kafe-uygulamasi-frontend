import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'core';
import { LoginModel } from '../../../models/user-model';
import { catchError, finalize, of } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);
  fb = inject(FormBuilder);

  loading: boolean = false;
  user: LoginModel = { username: '', password: '' };

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  get username(){
    return this.form.controls.username;
  }

  get password() {
    return this.form.controls.password;
  }

  onSubmit() {
    this.loading = true;
    this.authService
      .login(this.username.value!, this.password.value!)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.authService.setTokensToLocalStorage(res.accessToken, res.refreshToken);
        this.router.navigate(['']);
      });
  }
}
