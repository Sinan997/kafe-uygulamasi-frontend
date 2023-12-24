import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, ReactiveFormsModule, UntypedFormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AuthService } from 'core';
import { catchError, finalize } from 'rxjs';
import { LoginModel } from '../../models/login.model';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageDropdownComponent } from 'theme-shared'

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgxValidateCoreModule, LanguageDropdownComponent, TranslateModule],
})
export class LoginComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router);
  messageService = inject(MessageService);
  fb = inject(FormBuilder);
  loading: boolean = false;
  user: LoginModel;
  form: UntypedFormGroup;

  private buildForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  get username() {
    return this.form.controls['username'];
  }

  get password() {
    return this.form.controls['password'];
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    this.authService
      .login(this.username.value!, this.password.value!)
      .pipe(
        finalize(() => {
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
