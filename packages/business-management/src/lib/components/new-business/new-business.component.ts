import { Component, EventEmitter, Input, Output, inject, model, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { BusinessManagementService } from '../../services/business-management.service';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { AddBusinessModel } from '../../models/add-business.model';
import { CustomMessageService } from 'theme-shared';
import { tap } from 'rxjs';

@Component({
  selector: 'app-new-business-modal',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, TranslateModule, AutoFocusDirective, TrackEnterKeyDirective, NgxValidateCoreModule],
  templateUrl: './new-business.component.html',
})
export class NewBusinessComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly businessService = inject(BusinessManagementService);
  protected readonly customMessageService = inject(CustomMessageService);

  readonly visibleNewBusinessDialog = model(false);
  readonly updateList = output();

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.businessService
      .addBusiness({ ...this.form.value } as AddBusinessModel)
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
          this.visibleNewBusinessDialog.set(false);
          this.updateList.emit();
        }),
      )
      .subscribe();
  }
}
