import { NgClass } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'core';
import { catchError, finalize } from 'rxjs';
import { LoginModel } from '../../models/login.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);
  fb = inject(FormBuilder);

  loading: boolean = false;
  user: LoginModel;

  isSubmitted = signal(false);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  get username() {
    return this.form.controls.username;
  }

  get password() {
    return this.form.controls.password;
  }

  onSubmit() {
    this.isSubmitted.set(true);
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authService
      .login(this.username.value!, this.password.value!)
      .pipe(
        finalize(() => {
          this.isSubmitted.set(false);
          this.loading = false;
        }),
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.error.message,
          });
          throw err;
        }),
      )
      .subscribe((res) => {
        this.authService.setTokensToLocalStorage(res.accessToken, res.refreshToken);
        this.router.navigate(['']);
      });
  }
}
