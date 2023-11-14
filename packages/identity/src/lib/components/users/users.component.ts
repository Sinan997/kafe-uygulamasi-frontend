import {
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { User } from 'src/app/models/user-model';
import { IdentityService } from '../../services/identity.service';
import { NewUserComponent } from './new-user/new-user.component';
import { NgIf } from '@angular/common';
import { UsersTableComponent } from './table/users-table.component';
import { UsersToolbarComponent } from './toolbar/users-toolbar.component';
@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    providers: [ConfirmationService],
    standalone: true,
    imports: [
        UsersToolbarComponent,
        UsersTableComponent,
        NgIf,
        NewUserComponent,
    ],
})
export class UsersComponent implements OnInit {
  visibleNewUserDialog = false;
  identityService = inject(IdentityService);
  users: User[] = [];

  openNewUserModal() {
    this.visibleNewUserDialog = true;
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.identityService.getUsers().subscribe((result) => {
      this.users = result.users;
    });
  }
}
