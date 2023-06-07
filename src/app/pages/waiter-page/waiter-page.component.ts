import { Component, OnInit } from '@angular/core';
import { UserRequestService } from 'src/app/services/request-services/user-request.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/models/userModel';
import { roleModel } from 'src/app/models/roleModel';
import { AuthRequestService } from 'src/app/services/request-services/auth-request.service';
import { FormBuilder, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-waiter-page',
  templateUrl: './waiter-page.component.html',
  styleUrls: ['./waiter-page.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class WaiterPageComponent implements OnInit {
  user?: User;
  submitted?: boolean;
  userDialog?: boolean;
  users: User[] = [];
  selectedUsers: User[] | null = [];
  roles:roleModel[] = []
  selectedRole?:roleModel
  saveLoading:boolean = false;
  cleanUser = { id: '', name: '', role: '', surname: '', username: '', password: '' }

  userForm = this.fb.group({
    name: ['',Validators.required],
    surname: ['',Validators.required],
    username: ['',Validators.required],
    role: ['',Validators.required],
    password: ['',Validators.required],
  });
  
  constructor(
    private userRequestService: UserRequestService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder
    ) {}
    

  ngOnInit(): void {
    this.userRequestService.getAllUsers().subscribe((result) => {
      this.users = result.users;
    });

    this.roles = [
      { label: 'Admin', value: 'admin' },
      { label: 'Garson', value: 'waiter' }
    ];
  }

  clicked(){
    console.log('clicked');
  }

  openNew() {
    this.userForm.reset()
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
        message: 'Bu kullanıcıları silmek istediğine emin misin?',
        header: 'Onayla',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.users = this.users.filter((val) => !this.selectedUsers?.includes(val));
            this.selectedUsers = null;
            this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı Silindi'});
        }
    });
  }

  editUser(user:User){

  }

  deleteUser(user:User){}

  hideDialog(){
    this.submitted = false
    this.userDialog = false
  }

  saveUser(){
    this.submitted = true;
    const userExist = this.users.find(user=>user.username === this.username?.value)
    
    if(this.userForm.invalid){
      this.messageService.add({ severity: 'warn', summary: 'Uyarı', detail: 'Gerekli Alanları Doldurunuz' });
      return
    }

    if(userExist){
      this.messageService.add({ severity: 'warn', summary: 'İşlem Başarısız', detail: 'Bu Kullanıcı Adı Kullanılmakta' });
      return
    }else{
      const newUser = {...this.userForm.value} as User
      this.userRequestService.addUser(newUser).pipe(
        catchError(error=>{
          console.log('error',error.error);
          this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: error.error.message });
          return of()
        })
      ).subscribe(val=>{
        this.messageService.add({ severity: 'success', summary: 'Başarılı', detail: 'Kullanıcı Oluşturuldu'});
      })

      this.users.push(newUser)
      this.users = [...this.users]
      this.userDialog = false
    }

    this.userForm.reset()
  }


  get name(){
    return this.userForm.get('name')
  }
  get surname(){
    return this.userForm.get('surname')
  }
  get username(){
    return this.userForm.get('username')
  }
  get role(){
    return this.userForm.get('role')
  }
  get password(){
    return this.userForm.get('password')
  }
}
