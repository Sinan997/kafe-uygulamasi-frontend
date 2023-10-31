import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdentityService } from '../../../services/identity.service';
import { User } from '../../../models/user';
import { catchError, finalize, of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-new-user-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule],
  templateUrl: './new-user.component.html',
})
export class NewUserComponent {
  @Input() visibleNewUserDialog = true;
  @Output() visibleNewUserDialogChange = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();
  fb = inject(FormBuilder);
  identityService = inject(IdentityService);
  messageService = inject(MessageService);

  submitted = false;

  form = this.fb.group({
    name: ['', Validators.required],
    surname: ['', Validators.required],
    username: ['', Validators.required],
    role: ['', Validators.required],
    password: ['', Validators.required],
  });

  roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Garson', value: 'waiter' },
  ];

  get name() {
    return this.form.controls.name;
  }
  get surname() {
    return this.form.controls.surname;
  }
  get username() {
    return this.form.controls.username;
  }
  get role() {
    return this.form.controls.role;
  }
  get password() {
    return this.form.controls.password;
  }

  hideDialog() {
    this.visibleNewUserDialog = false;
    this.visibleNewUserDialogChange.emit(false);
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const newUser = { ...this.form.value } as User;

    this.identityService
      .addUser(newUser)
      .pipe(
        catchError((error) => {
          console.log('error', error.error);
          this.messageService.add({
            severity: 'error',
            summary: 'İşlem Başarısız',
            detail: error.error.message,
          });
          return of();
        }),
        finalize(() => {
          this.submitted = false;
          this.visibleNewUserDialog = false;
          this.visibleNewUserDialogChange.emit(false);
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
}
