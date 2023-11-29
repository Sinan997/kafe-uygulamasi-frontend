import { Component, EventEmitter, Output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
@Component({
  standalone: true,
  imports: [ToolbarModule],
  selector: 'app-users-toolbar',
  templateUrl: './users-toolbar.component.html',
})
export class UsersToolbarComponent {
  @Output() addNewUserEvent = new EventEmitter<boolean>();
}
