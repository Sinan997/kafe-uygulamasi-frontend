import { Component, EventEmitter, Input, NgZone, OnInit, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';
import { UserModel } from '../../models/user.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, finalize, of } from 'rxjs';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule],
  templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {
  @Input() user: UserModel;
  @Input() visibleEditUserDialog = true;
  @Output() visibleEditUserDialogChange = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  fb = inject(FormBuilder);
  identityService = inject(IdentityService);
  messageService = inject(MessageService);
  confirmationService = inject(ConfirmationService);
  ngZone = inject(NgZone);

  isPasswordInputClose?: boolean = true;
  submitted = signal(false);
  roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Garson', value: 'waiter' },
  ];

  form = this.fb.group({
    _id: ['', Validators.required],
    username: ['', Validators.required],
    password: [''],
  });

  get username() {
    return this.form.controls.username;
  }
  get password() {
    return this.form.controls.password;
  }

  ngOnInit(): void {
    this.form.patchValue({
      _id: this.user._id,
      username: this.user.username,
      password: '',
    });
  }

  hideDialog() {
    this.visibleEditUserDialog = false;
    this.visibleEditUserDialogChange.emit(false);
  }

  onSubmit() {
    this.submitted.set(true);
    if (this.form.invalid) {
      return;
    }
    const newUser = { ...this.form.value } as UserModel;
    this.identityService
      .updateUser(newUser)
      .pipe(
        catchError((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'İşlem Başarısız',
            detail: error.error.message,
          });
          return of();
        }),
        finalize(() => {
          this.submitted.set(false);
          this.hideDialog();
        }),
      )
      .subscribe((val) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: val.message,
        });

        this.updateList.emit();
      });
  }

  editPassword(event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Bu Kullanıcının Şifresini Değiştirmek İstiyor musun?',
      icon: 'pi pi-exclamation-triangle',
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
