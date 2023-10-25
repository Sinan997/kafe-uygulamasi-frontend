import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityRoutingModule } from './identity-routing.module';
import { IdentityManagementComponent } from './components/identity-management/identity-management.component';
import { IdentityManagementToolbarComponent } from './components/identity-management-toolbar/identity-management-toolbar.component';
import { IdentityManagementTableComponent } from './components/identity-management-table/identity-management-table.component';
import { IdentityManagementNewUserComponent } from './components/identity-management-new-user/identity-management-new-user.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
@NgModule({
  imports: [
    CommonModule,
    IdentityRoutingModule,
    IdentityManagementToolbarComponent,
    IdentityManagementTableComponent,
    IdentityManagementNewUserComponent,
    ConfirmDialogModule,
  ],
  declarations: [IdentityManagementComponent],
})
export class IdentityModule {}
