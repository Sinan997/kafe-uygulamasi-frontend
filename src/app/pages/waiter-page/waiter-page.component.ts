import { Component, OnInit } from '@angular/core';
import { UserRequestService } from 'src/app/services/request-services/user-request.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/models/userModel';

@Component({
  selector: 'app-waiter-page',
  templateUrl: './waiter-page.component.html',
  styleUrls: ['./waiter-page.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class WaiterPageComponent implements OnInit {
  user?: User;
  users: User[] = [];
  submitted?: boolean;
  userDialog?: boolean;
  selectedUsers: User[] | null = [];

  constructor(
    private userRequestService: UserRequestService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.userRequestService.getAllUsers().subscribe((result) => {
      this.users = result.users;
    });
  }

  openNew() {
    this.user = { id: '', name: '', role: '', surname: '', username: '' };
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
        message: 'Bu garsonları silmek istediğine emin misin?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter((val) => !this.users.includes(val));
            this.selectedUsers = null;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Garson Silindi', life: 3000 });
        }
    });
  }

  editUser(user:User){

  }

  deleteUser(user:User){}

}
