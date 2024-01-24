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
import { BusinessManagementService } from '../../services/business-management.service';
import { BusinessModel } from '../../models/business.model';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, finalize, of } from 'rxjs';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';

@Component({
  selector: 'app-edit-business-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    AutoFocusDirective,
    TrackEnterKeyDirective,
  ],
  templateUrl: './edit-business.component.html',
})
export class EditBusinessComponent implements OnInit {
  @Input() business: BusinessModel;
  @Input() visibleEditBusinessDialog = true;
  @Output() visibleEditBusinessDialogChange = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  fb = inject(FormBuilder);
  identityService = inject(BusinessManagementService);
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
    email: ['', Validators.required],
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
      _id: this.business._id,
      username: this.business.name,
      password: '',
    });
  }

  hideDialog() {
    this.visibleEditBusinessDialog = false;
    this.visibleEditBusinessDialogChange.emit(false);
  }

  onSubmit() {
    this.submitted.set(true);
    if (this.form.invalid) {
      return;
    }
    const newUser = { ...this.form.value } as BusinessModel;
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
