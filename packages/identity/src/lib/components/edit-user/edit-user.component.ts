import { Component, EventEmitter, Input, OnInit, Output, inject, input, model, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';
import { UserModel } from '../../models/user.model';
import { ConfirmationService } from 'primeng/api';
import { tap } from 'rxjs';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';
import { CustomMessageService } from 'theme-shared';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, AutoFocusDirective, TrackEnterKeyDirective, TranslateModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {
  protected readonly fb = inject(FormBuilder);
  protected readonly service = inject(IdentityService);
  protected readonly customMessageService = inject(CustomMessageService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly translateService = inject(TranslateService);

  readonly visibleEditUserDialog = model<boolean>(false);
  readonly user = input<UserModel>({} as UserModel);
  readonly updateList = output();

  isPasswordInputClose = signal(true);

  form = this.fb.group({
    _id: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: [''],
  });

  ngOnInit(): void {
    this.form.patchValue({
      _id: this.user()._id,
      username: this.user().username,
      email: this.user().email,
      password: '',
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.service
      .updateUser({ ...this.form.value } as UserModel)
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
          this.updateList.emit();
          this.visibleEditUserDialog.set(false);
        }),
      )
      .subscribe();
  }

  editPassword(event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: this.translateService.instant('changePasswordConfirmation'),
      icon: 'fa-solid fa-circle-exclamation',
      accept: () => {
        this.isPasswordInputClose.set(false);
        setTimeout(() => {
          this.form.controls.password.setValidators(Validators.required);
          this.form.controls.password.updateValueAndValidity();
        }, 0);
      },
    });
  }
}
