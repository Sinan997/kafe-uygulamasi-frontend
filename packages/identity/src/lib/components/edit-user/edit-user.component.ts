import {
  Component,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';
import { UserModel } from '../../models/user.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, finalize, of, tap } from 'rxjs';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';
import { CustomMessageService } from 'theme-shared';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    AutoFocusDirective,
    TrackEnterKeyDirective,
    TranslateModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {
  @Input() user: UserModel;
  @Input() visibleEditUserDialog = true;
  @Output() visibleEditUserDialogChange = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  fb = inject(FormBuilder);
  service = inject(IdentityService);
  customMessageService = inject(CustomMessageService);
  confirmationService = inject(ConfirmationService);
  translateService = inject(TranslateService);
  isPasswordInputClose?: boolean = true;

  form = this.fb.group({
    _id: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: [''],
  });

  get password() {
    return this.form.controls.password;
  }

  ngOnInit(): void {
    this.form.patchValue({
      _id: this.user._id,
      username: this.user.username,
      email: this.user.email,
      password: '',
    });
  }

  hideDialog() {
    this.visibleEditUserDialog = false;
    this.visibleEditUserDialogChange.emit(false);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const newUser = { ...this.form.value } as UserModel;
    this.service
      .updateUser(newUser)
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
          this.updateList.emit();
          this.hideDialog();
        }),
      )
      .subscribe();
  }

  editPassword(event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: this.translateService.instant('changePasswordConfirmation'),
      icon: 'fa fa-check',
      accept: () => {
        this.isPasswordInputClose = false;
        setTimeout(() => {
          this.password.setValidators(Validators.required);
          this.password.updateValueAndValidity();
        }, 0);
      },
    });
  }
}
