import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { tap } from 'rxjs';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomMessageService } from 'theme-shared';
import { UserModel } from '../../models/user.model';
import { IdentityService } from '../../services/identity.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, TableModule, ConfirmDialogModule, EditUserComponent, TranslateModule],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent {
  protected readonly service = inject(IdentityService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly translateService = inject(TranslateService);
  protected readonly customMessageService = inject(CustomMessageService);

  readonly users = input.required<UserModel[]>();
  readonly updateList = output();

  selectedUser = signal({} as UserModel);
  visibleEditUserDialog = signal(false);

  openEditUserModal(user: UserModel) {
    this.visibleEditUserDialog.set(true);
    this.selectedUser.set(user);
  }

  deleteUser(user: UserModel) {
    this.confirmationService.confirm({
      message: this.translateService.instant('identity.deleteUserMessage', {
        username: user.username,
      }),
      icon: 'fa-solid fa-triangle-exclamation',
      accept: () => {
        this.service
          .deleteUser(user._id)
          .pipe(
            tap((val) => {
              this.customMessageService.success(val);
              this.updateList.emit();
            }),
          )
          .subscribe();
      },
    });
  }
}
