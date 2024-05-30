import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageDropdownComponent } from 'theme-shared';
import { AuthService } from 'core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, NgxValidateCoreModule, LanguageDropdownComponent, TranslateModule],
})
export class LoginComponent {
  protected readonly authService = inject(AuthService);
  protected readonly fb = inject(FormBuilder);

  form = this.fb.group({
    username: ['', { validators: [Validators.required] }],
    password: ['', { validators: [Validators.required] }],
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.authService.login(this.form.controls.username.value!, this.form.controls.password.value!);
  }
}
