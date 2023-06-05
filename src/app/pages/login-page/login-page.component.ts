import { Component } from '@angular/core';
import { User, loginModel } from '../../models/userModel';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';
import { loginResponse } from 'src/app/models/apiModels/loginResponse';
import { Router } from '@angular/router';
import { errorResponse } from 'src/app/models/apiModels/errorResponse';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [MessageService]
})
export class LoginPageComponent {
  user: loginModel = { username: '', password: '' };
  loading: boolean = false;
  constructor(private authService: AuthService,private router:Router,private messageService: MessageService) {}

  onSubmit(user: loginModel) {
    this.loading = true;
    this.authService.doLogin(user).subscribe(
      {
        next: (res) => {
            res = res as loginResponse;
            console.log('navigate edildi');
            localStorage.setItem('accessToken', res.accessToken);
            localStorage.setItem('user',JSON.stringify(res.user))
            this.loading = false
            this.router.navigate(['']);
        },
        error: (err) => {
          const error: errorResponse = err.error
          console.log('err',error);
          this.sendAlert(error.message)
          this.loading = false
        }
      }
    );
  }

  sendAlert(message:string){
    this.messageService.add({ severity: 'error', summary: 'Error', detail: message, sticky:true });
  }
}
