import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login.component';
import { LoginRoutingModule } from './login.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, CoreModule, LoginRoutingModule, ReactiveFormsModule],
  providers: [MessageService],
})
export class LoginModule {}
