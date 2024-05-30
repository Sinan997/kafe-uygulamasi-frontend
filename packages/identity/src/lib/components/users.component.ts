import { Component, OnInit, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { IdentityService } from '../services/identity.service';
import { NewUserComponent } from './new-user/new-user.component';
import { UsersTableComponent } from './table/users-table.component';
import { UsersToolbarComponent } from './toolbar/users-toolbar.component';
import { UserModel } from '../models/user.model';
@Component({
  selector: 'app-users',
  standalone: true,
  imports: [UsersToolbarComponent, UsersTableComponent, NewUserComponent],
  templateUrl: './users.component.html',
})
export class UsersComponent implements OnInit {
  protected readonly identityService = inject(IdentityService);

  visibleNewUserDialog = signal(false);
  users = signal<UserModel[]>([]);

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.identityService
      .getUsers()
      .pipe(tap((res) => this.users.set(res.users)))
      .subscribe();
  }
}
