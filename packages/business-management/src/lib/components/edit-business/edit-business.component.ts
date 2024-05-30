import { Component, OnInit, inject, input, model, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';
import { BusinessManagementService } from '../../services/business-management.service';
import { BusinessModel } from '../../models/business.model';
import { CustomMessageService } from 'theme-shared';
import { EditBusinessModel } from '../../models/edit-business.modal';

@Component({
  selector: 'app-edit-business-modal',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, AutoFocusDirective, TrackEnterKeyDirective, TranslateModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './edit-business.component.html',
})
export class EditBusinessComponent implements OnInit {
  protected readonly fb = inject(FormBuilder);
  protected readonly service = inject(BusinessManagementService);
  protected readonly customMessageService = inject(CustomMessageService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly translateService = inject(TranslateService);

  readonly business = input.required<BusinessModel>();
  readonly visibleEditBusinessDialog = model.required<boolean>();
  readonly updateList = output();

  isPasswordInputClose = signal(true);

  form = this.fb.group({
    _id: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', Validators.required],
    ownerId: ['', Validators.required],
    password: [''],
  });

  ngOnInit(): void {
    this.form.patchValue({
      _id: this.business()._id,
      name: this.business().name,
      email: this.business().ownerId.email,
      ownerId: this.business().ownerId._id,
      password: '',
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.service
      .updateBusiness({ ...this.form.value } as EditBusinessModel)
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
          this.visibleEditBusinessDialog.set(false);
          this.updateList.emit();
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
