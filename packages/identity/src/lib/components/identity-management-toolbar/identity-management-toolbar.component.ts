import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { User } from 'src/app/models/user-model';

@Component({
  standalone: true,
  imports: [ToolbarModule],
  selector: 'app-identity-management-toolbar',
  templateUrl: './identity-management-toolbar.component.html',
  styleUrls: ['./identity-management-toolbar.component.scss'],
})
export class IdentityManagementToolbarComponent {
  @Output() addNewUserEvent = new EventEmitter<boolean>();
  @Output() deleteSelectedUsersEvent = new EventEmitter<boolean>();
  @Input() selectedUsers: User[] = [];
}
