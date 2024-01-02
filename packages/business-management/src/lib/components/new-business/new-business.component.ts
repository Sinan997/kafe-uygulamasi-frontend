import {
  Component,
  DestroyRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DialogModule } from 'primeng/dialog';
import { BusinessManagementService } from '../../services/business-management.service';
import { catchError, finalize, of } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';
import { TranslateModule } from '@ngx-translate/core';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { AddBusinessModel } from '../../models/add-business.model';
import { CustomMessageService } from 'theme-shared';

@Component({
  selector: 'app-new-business-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    TranslateModule,
    AutoFocusDirective,
    TrackEnterKeyDirective,
    NgxValidateCoreModule
  ],
  templateUrl: './new-business.component.html',
})
export class NewBusinessComponent {
  @Input() visibleNewBusinessDialog = true;
  @Output() visibleNewBusinessDialogChange = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();
  fb = inject(FormBuilder);
  businessService = inject(BusinessManagementService);
  customMessageService = inject(CustomMessageService);
  destroyRef = inject(DestroyRef);


  form = this.fb.group({
    name: ['', Validators.required],
    email: ['asd@gmail.com', Validators.required],
    password: ['123', Validators.required],
  });

  roles = [
    { label: 'admin', value: 'admin' },
    { label: 'business', value: 'business' },
  ];

  get name() {
    return this.form.controls.name;
  }

  get password() {
    return this.form.controls.password;
  }

  hideDialog() {
    this.visibleNewBusinessDialog = false;
    this.visibleNewBusinessDialogChange.emit(false);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.businessService
      .addBusiness({ ...this.form.value } as AddBusinessModel)
      .subscribe((val) => {
        this.customMessageService.success(val.code);

        this.hideDialog();
        this.updateList.emit();
      });
  }
}
