import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { UserRequestService } from 'src/app/services/request-services/user-request.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { User } from 'src/app/models/user-model';
import { roleModel } from 'src/app/models/role-model';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { Table } from 'primeng/table';
import { IdentityManagementToolbarComponent } from '../identity-management-toolbar/identity-management-toolbar.component';
@Component({
  selector: 'app-waiter-page',
  templateUrl: './identity-management.component.html',
  styleUrls: ['./identity-management.component.scss'],
  providers: [ConfirmationService],
})
export class IdentityManagementComponent implements OnInit {
  @ViewChild('thisInput') thisInput?: ElementRef;
  user?: User;
  submitted?: boolean;
  userDialog: boolean = false;
  users: User[] = [];
  selectedUsers: User[] = [];
  roles: roleModel[] = [];
  selectedRole?: roleModel;
  saveLoading: boolean = false;
  cleanUser = { id: '', name: '', role: '', surname: '', username: '', password: '' };
  isEdit?: boolean = false;
  isPasswordInputClose?: boolean = false;

  userForm = this.fb.group({
    id: [''],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    username: ['', Validators.required],
    role: ['', Validators.required],
    password: ['', this.isPasswordInputClose],
  });

  constructor(
    private userRequestService: UserRequestService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.userRequestService.getAllUsers().subscribe((result) => {
      this.users = result.users;
    });

    this.roles = [
      { label: 'Admin', value: 'admin' },
      { label: 'Garson', value: 'waiter' },
    ];
  }

  clicked() {
    console.log('clicked');
  }

  openNew() {
    this.userForm.reset();
    this.isEdit = false;
    this.isPasswordInputClose = false;
    this.submitted = false;
    this.userDialog = true;
  }

  deleteSelectedUsers() {
    this.confirmationService.confirm({
      message: 'Bu kullanıcıları silmek istediğine emin misin?',
      header: 'Onayla',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        const ids = this.selectedUsers!.map((selectedUser) => selectedUser._id);
        this.userRequestService
          .deleteUsers(ids)
          .pipe(
            catchError((error) => {
              console.log('error', error.error);
              this.messageService.add({
                severity: 'error',
                summary: 'İşlem Başarısız',
                detail: error.error.message,
              });
              return of();
            }),
          )
          .subscribe((val) => {
            this.users = this.users.filter((val) => !this.selectedUsers?.includes(val));
            this.messageService.add({
              severity: 'success',
              summary: 'Başarılı',
              detail: val.message,
            });
            this.users = [...this.users];
          });
      },
    });
  }

  editUser(user: User) {
    this.isEdit = true;
    this.isPasswordInputClose = true;
    this.userDialog = true;
    this.userForm.setValue({
      name: user.name,
      surname: user.surname,
      username: user.username,
      role: user.role,
      password: '',
      id: user._id,
    });
  }

  editPassword(event: Event) {
    this.confirmationService.confirm({
      target: event.target!,
      message: 'Bu Kullanıcının Şifresini Değiştirmek İstiyor musun?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.isPasswordInputClose = false;
      },
    });
  }

  deleteUser(user: User) {
    this.confirmationService.confirm({
      message: user.username + ' Kullanıcısını silmek istediğine emin misin?',
      header: 'Onayla',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.userRequestService
          .deleteUser(user._id)
          .pipe(
            catchError((error) => {
              console.log('error', error.error);
              this.messageService.add({
                severity: 'error',
                summary: 'İşlem Başarısız',
                detail: error.error.message,
              });
              return of();
            }),
          )
          .subscribe((val) => {
            this.users = this.users.filter((val) => val._id !== user._id);
            this.messageService.add({
              severity: 'success',
              summary: 'Başarılı',
              detail: val.message,
            });
            this.users = [...this.users];
          });
      },
    });
  }

  hideDialog() {
    this.submitted = false;
    this.userDialog = false;
    this.userForm.reset();
  }

  clear(table: Table) {
    this.thisInput!.nativeElement.value = '';
    table.clear();
  }

  saveUser() {
    this.submitted = true;
    const userExist = this.users.find((user) => user.username === this.username?.value);

    if (this.userForm.invalid) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Uyarı',
        detail: 'Gerekli Alanları Doldurunuz',
      });
      return;
    }

    if (userExist && !this.isEdit) {
      this.messageService.add({
        severity: 'warn',
        summary: 'İşlem Başarısız',
        detail: 'Bu Kullanıcı Adı Kullanılmakta',
      });
      return;
    } else {
      const newUser = { ...this.userForm.value } as User;

      if (this.isEdit) {
        this.userRequestService
          .updateUser(newUser)
          .pipe(
            catchError((error) => {
              console.log('error', error.error);
              this.messageService.add({
                severity: 'error',
                summary: 'İşlem Başarısız',
                detail: error.error.message,
              });
              return of();
            }),
          )
          .subscribe((val) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Başarılı',
              detail: val.message,
            });
            this.users = this.users.map((user) => {
              if (user._id === val.user._id) {
                user = { ...val.user };
              }
              return user;
            });
          });
      } else {
        this.userRequestService
          .addUser(newUser)
          .pipe(
            catchError((error) => {
              console.log('error', error.error);
              this.messageService.add({
                severity: 'error',
                summary: 'İşlem Başarısız',
                detail: error.error.message,
              });
              return of();
            }),
          )
          .subscribe((val) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Başarılı',
              detail: val.message,
            });
            this.users.push(val.user);
          });
      }
    }
    this.users = [...this.users];
    this.userDialog = false;
    this.userForm.reset();
  }

  get name() {
    return this.userForm.get('name');
  }
  get surname() {
    return this.userForm.get('surname');
  }
  get username() {
    return this.userForm.get('username');
  }
  get role() {
    return this.userForm.get('role');
  }
  get password() {
    return this.userForm.get('password');
  }
}
