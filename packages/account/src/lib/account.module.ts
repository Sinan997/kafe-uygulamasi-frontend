import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routes.module';
import { LoginComponent } from './components';
import { CoreModule } from 'core';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, CoreModule, AccountRoutingModule],
})
export class AccountModule {}
