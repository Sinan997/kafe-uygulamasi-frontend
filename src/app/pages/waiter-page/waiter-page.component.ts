import { Component } from '@angular/core';
import { UserRequestService } from 'src/app/services/request-services/user-request.service';

@Component({
  selector: 'app-waiter-page',
  templateUrl: './waiter-page.component.html',
  styleUrls: ['./waiter-page.component.scss'],
})
export class WaiterPageComponent {
  constructor(private userRequestService: UserRequestService) {
    userRequestService.getAllUsers().subscribe(result=>{
      console.log(result);
    })
  }
}
