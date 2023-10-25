import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';
import { User } from '../../models/user';
import { catchError, finalize, of } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-identity-management-new-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule],
  templateUrl: './identity-management-edit-user.component.html',
  styleUrls: ['./identity-management-edit-user.component.scss'],
})
export class IdentityManagementEditUserComponent implements OnInit {
  @Input() user: User;
  @Input() visibleEditUserDialog = true;
  @Output() visibleEditUserDialogChange = new EventEmitter<boolean>();

  fb = inject(FormBuilder);
  identityService = inject(IdentityService);
  messageService = inject(MessageService);

  submitted = false;
  roles = [
    { label: 'Admin', value: 'admin' },
    { label: 'Garson', value: 'waiter' },
  ];

  form = this.fb.group({
    _id: ['', Validators.required],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    username: ['', Validators.required],
    role: ['', Validators.required],
    password: [''],
    // password: ['', this.isPasswordInputClose],
  });

  get name() {
    return this.form.controls.name;
  }
  get surname() {
    return this.form.controls.surname;
  }
  get username() {
    return this.form.controls.username;
  }
  get role() {
    return this.form.controls.role;
  }
  get password() {
    return this.form.controls.password;
  }

  ngOnInit(): void {
    this.form.setValue({
      _id: this.user._id,
      name: this.user.name,
      surname: this.user.surname,
      username: this.user.username,
      role: this.user.role,
      password: '',
    });
  }

  hideDialog() {
    this.visibleEditUserDialog = false;
    this.visibleEditUserDialogChange.emit(false);
  }

  onSubmit() {}
}
