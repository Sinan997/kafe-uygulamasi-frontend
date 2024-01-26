import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { IdentityService } from '../../services/identity.service';
import { tap } from 'rxjs';
import { AddUserModel } from '../../models/add-user.model';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';
import { TranslateModule } from '@ngx-translate/core';
import { CustomMessageService } from 'theme-shared';

@Component({
  selector: 'app-new-user-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    AutoFocusDirective,
    TrackEnterKeyDirective,
    TranslateModule,
  ],
  templateUrl: './new-user.component.html',
})
export class NewUserComponent {
  @Input() visibleNewUserDialog = true;
  @Output() visibleNewUserDialogChange = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();
  fb = inject(FormBuilder);
  service = inject(IdentityService);
  customMessageService = inject(CustomMessageService);

  form = this.fb.group({
    username: ['asd', Validators.required],
    email: ['asd@gmail.com', Validators.required],
    password: ['123', Validators.required],
  });

  hideDialog() {
    this.visibleNewUserDialog = false;
    this.visibleNewUserDialogChange.emit(false);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.service
      .addUser({ ...this.form.value } as AddUserModel)
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
          this.updateList.emit();
          this.hideDialog();
        }),
      )
      .subscribe();
  }
}
