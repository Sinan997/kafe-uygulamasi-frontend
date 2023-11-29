import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogModule } from 'primeng/dialog';
import { IdentityService } from '../../services/identity.service';
import { catchError, finalize, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NgClass } from '@angular/common';
import { AddUserModel } from '../../models/add-user.model';

@Component({
  selector: 'app-new-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, NgClass],
  templateUrl: './new-user.component.html',
})
export class NewUserComponent implements OnInit {
  @Input() visibleNewUserDialog = true;
  @Output() visibleNewUserDialogChange = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();
  fb = inject(FormBuilder);
  identityService = inject(IdentityService);
  messageService = inject(MessageService);
  destroyRef = inject(DestroyRef);

  submitted = signal(false);

  form = this.fb.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    role: ['', Validators.required],
    password: ['', Validators.required],
    businessName: [''],
  });

  roles = [
    { label: 'admin', value: 'admin' },
    { label: 'business', value: 'business' },
  ];

  get username() {
    return this.form.controls.username;
  }
  get email() {
    return this.form.controls.email;
  }
  get role() {
    return this.form.controls.role;
  }
  get password() {
    return this.form.controls.password;
  }
  get businessName() {
    return this.form.controls.businessName;
  }

  ngOnInit(): void {
    this.role.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
      if (value === 'business') {
        this.businessName.setValidators(Validators.required);
      } else {
        this.businessName.clearValidators();
      }
      this.businessName.updateValueAndValidity();
    });
  }

  hideDialog() {
    this.visibleNewUserDialog = false;
    this.visibleNewUserDialogChange.emit(false);
  }

  onSubmit() {
    this.submitted.set(true);
    if (this.form.invalid) {
      return;
    }

    this.identityService
      .addUser({ ...this.form.value } as AddUserModel)
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
          this.hideDialog();
          this.submitted.set(false);
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
