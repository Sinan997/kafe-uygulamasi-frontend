import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BusinessManagementService } from '../../services/business-management.service';
import { BusinessModel } from '../../models/business.model';
import { ConfirmationService } from 'primeng/api';
import { tap } from 'rxjs';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomMessageService } from 'theme-shared';
import { EditBusinessModel } from '../../models/edit-business.modal';

@Component({
  selector: 'app-edit-business-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    AutoFocusDirective,
    TrackEnterKeyDirective,
    TranslateModule,
  ],
  templateUrl: './edit-business.component.html',
})
export class EditBusinessComponent implements OnInit {
  @Input() business: BusinessModel;
  @Input() visibleEditBusinessDialog = true;
  @Output() visibleEditBusinessDialogChange = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  fb = inject(FormBuilder);
  service = inject(BusinessManagementService);
  customMessageService = inject(CustomMessageService);
  confirmationService = inject(ConfirmationService);
  translateService = inject(TranslateService);

  isPasswordInputClose?: boolean = true;

  form = this.fb.group({
    _id: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    ownerId: ['', Validators.required],
    password: [''],
  });

  get password() {
    return this.form.controls.password;
  }

  ngOnInit(): void {
    this.form.patchValue({
      _id: this.business._id,
      name: this.business.name,
      email: this.business.ownerId.email,
      ownerId: this.business.ownerId._id,
      password: '',
    });
  }

  hideDialog() {
    this.visibleEditBusinessDialog = false;
    this.visibleEditBusinessDialogChange.emit(false);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    const business = { ...this.form.value } as EditBusinessModel;
    this.service
      .updateBusiness(business)
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
          this.hideDialog();
          this.updateList.emit();
        }),
      )
      .subscribe();
  }

  editPassword(event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: this.translateService.instant('changePasswordConfirmation'),
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
