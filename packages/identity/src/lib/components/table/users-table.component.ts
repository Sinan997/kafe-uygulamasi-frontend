import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { UserModel } from '../../models/user.model';
import { IdentityService } from '../../services/identity.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ConfirmDialogModule,
    EditUserComponent,
  ],
  templateUrl: './users-table.component.html',
})
export class UsersTableComponent {
  @Input() users: UserModel[];
  @Output() updateList = new EventEmitter<boolean>();

  identityService = inject(IdentityService);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);

  user: UserModel;
  selectedUsers: UserModel[] = [];
  visibleEditUserDialog = false;

  openEditUserModal(user: UserModel) {
    this.visibleEditUserDialog = true;
    this.user = user;
  }

  deleteUser(user: UserModel) {
    this.confirmationService.confirm({
      message: user.username + ' Kullanıcısını silmek istediğine emin misin?',
      header: 'Kullanıcı Silme',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.identityService
          .deleteUser(user._id)
          .pipe(
            catchError((error) => {
              this.messageService.add({
                severity: 'error',
                summary: 'İşlem Başarısız',
                detail: error.error.message,
              });
              return of();
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
      },
    });
  }
}
