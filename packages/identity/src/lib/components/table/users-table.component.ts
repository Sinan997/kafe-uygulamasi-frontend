import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { UserModel } from '../../models/user.model';
import { IdentityService } from '../../services/identity.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, of, tap } from 'rxjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomMessageService } from 'theme-shared';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [CommonModule, TableModule, ConfirmDialogModule, EditUserComponent, TranslateModule],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent {
  @Input() users: UserModel[];
  @Output() updateList = new EventEmitter<boolean>();

  service = inject(IdentityService);
  confirmationService = inject(ConfirmationService);
  translateService = inject(TranslateService);
  customMessageService = inject(CustomMessageService);

  user: UserModel;
  visibleEditUserDialog = false;

  openEditUserModal(user: UserModel) {
    this.visibleEditUserDialog = true;
    this.user = user;
  }

  deleteUser(user: UserModel) {
    this.confirmationService.confirm({
      message: this.translateService.instant('identity.deleteUserMessage', {
        username: user.username,
      }),
      header: this.translateService.instant('identity.deleteUserHeader'),
      icon: 'pi pi-exclamation-triangle',
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
