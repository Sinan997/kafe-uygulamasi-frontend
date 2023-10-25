import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { User } from '../../models/user';
import { IdentityService } from '../../services/identity.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IdentityManagementEditUserComponent } from '../identity-management-edit-user/identity-management-edit-user.component';

@Component({
  selector: 'app-identity-management-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ConfirmDialogModule,
    IdentityManagementEditUserComponent,
  ],
  templateUrl: './identity-management-table.component.html',
})
export class IdentityManagementTableComponent implements OnInit {
  identityService = inject(IdentityService);
  confirmationService = inject(ConfirmationService);
  messageService = inject(MessageService);

  users: User[];
  user: User;
  selectedUsers: User[] = [];
  tableLoading = true;
  visibleEditUserDialog = false;

  ngOnInit(): void {
    this.identityService.getUsers().subscribe((result) => {
      this.users = result.users;
      this.tableLoading = false;
    });
  }
  
  openEditUserModal(user: User) {
    this.visibleEditUserDialog = true;
    this.user = user;
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: user.username + ' Kullanıcısını silmek istediğine emin misin?',
      header: 'Kullanıcı Silme',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.identityService
          .deleteUser(user._id)
          .pipe(
            catchError((error) => {
              console.log('error', error.error);
              this.messageService.add({
                severity: 'error',
                summary: 'İşlem Başarısız',
                detail: error.error.message,
              });
              return of();
            }),
          )
          .subscribe((val) => {
            this.users = this.users.filter((val) => val._id !== user._id);
            this.messageService.add({
              severity: 'success',
              summary: 'Başarılı',
              detail: val.message,
            });
            this.users = [...this.users];
          });
      },
    });
  }
}
