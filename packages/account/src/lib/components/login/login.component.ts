import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'core';
import { finalize } from 'rxjs';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
    selector: 'app-login-page',
    templateUrl: './login.component.html',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgClass,
        NgIf,
    ],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);
  fb = inject(FormBuilder);

  loading: boolean = false;
  user = { username: '', password: '' };

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
    this.loading = true;
    this.isSubmitted.set(true);
    this.authService
      .login(this.username.value!, this.password.value!)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((res) => {
        this.authService.setTokensToLocalStorage(res.accessToken, res.refreshToken);
        this.router.navigate(['']);
      });
  }
}
