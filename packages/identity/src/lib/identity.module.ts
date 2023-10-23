import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IdentityRoutingModule } from './identity-routing.module';
import { IdentityManagementComponent } from './components/identity-management/identity-management.component';
import { IdentityManagementToolbarComponent } from './components/identity-management-toolbar/identity-management-toolbar.component';

@NgModule({
  imports: [CommonModule, IdentityRoutingModule, IdentityManagementToolbarComponent],
  declarations: [IdentityManagementComponent],
})
export class IdentityModule {}
