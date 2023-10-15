import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login.component';
import { LoginRoutingModule } from './login.routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { AuthService } from '../../core/services/auth.service';
import { MessageService } from 'primeng/api';

@NgModule({
  declarations: [LoginComponent],
  imports: [SharedModule, CoreModule, LoginRoutingModule],
  providers: [AuthService, MessageService],
})
export class LoginModule {}
