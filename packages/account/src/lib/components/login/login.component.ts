import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService, Roles } from 'core';
import { LoginModel } from '../../models/login.model';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomMessageService, LanguageDropdownComponent } from 'theme-shared';
import { tap } from 'rxjs';
import { SocketIOService } from 'orders';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgxValidateCoreModule, LanguageDropdownComponent, TranslateModule],
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);
  fb = inject(FormBuilder);
  customMessageService = inject(CustomMessageService);
  socketService = inject(SocketIOService);

  user: LoginModel;
  form = this.fb.group({
    username: ['', { validators: [Validators.required] }],
    password: ['', { validators: [Validators.required] }],
  });

  get username() {
    return this.form.controls.username;
  }

  get password() {
    return this.form.controls.password;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.authService
      .login(this.username.value!, this.password.value!)
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
          this.authService.setTokensToLocalStorage(res.accessToken, res.refreshToken);
          if(this.authService.userValue?.role !== Roles.Admin){
            this.socketService.startListening();
          }
          this.router.navigate(['']);
        }),
      )
      .subscribe();
  }
}
