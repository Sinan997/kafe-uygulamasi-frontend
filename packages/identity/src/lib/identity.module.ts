import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityRoutingModule } from './identity-routing.module';
import { UsersComponent } from './components/users/users.component';
import { UsersToolbarComponent } from './components/users/toolbar/users-toolbar.component';
import { UsersTableComponent } from './components/users/table/users-table.component';
import { NewUserComponent } from './components/users/new-user/new-user.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
  imports: [
    CommonModule,
    IdentityRoutingModule,
    UsersToolbarComponent,
    UsersTableComponent,
    NewUserComponent,
    ConfirmDialogModule,
  ],
  declarations: [UsersComponent],
})
export class IdentityModule {}
