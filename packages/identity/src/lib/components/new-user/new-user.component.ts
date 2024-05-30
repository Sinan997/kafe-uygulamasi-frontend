import { Component, inject, model, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { CustomMessageService } from 'theme-shared';
import { IdentityService } from '../../services/identity.service';
import { AddUserModel } from '../../models/add-user.model';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';

@Component({
  selector: 'app-new-user-modal',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, AutoFocusDirective, TrackEnterKeyDirective, TranslateModule, NgxValidateCoreModule],
  templateUrl: './new-user.component.html',
})
export class NewUserComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly service = inject(IdentityService);
  protected readonly customMessageService = inject(CustomMessageService);

  readonly visibleNewUserDialog = model.required<boolean>();
  readonly updateList = output();

  form = this.fb.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

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
          this.visibleNewUserDialog.set(false);
        }),
      )
      .subscribe();
  }
}
