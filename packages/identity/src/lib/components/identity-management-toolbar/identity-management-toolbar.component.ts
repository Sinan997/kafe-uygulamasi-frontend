import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  standalone: true,
  imports: [CommonModule, ToolbarModule],
  selector: 'app-identity-management-toolbar',
  templateUrl: './identity-management-toolbar.component.html',
})
export class IdentityManagementToolbarComponent {
  @Output() addNewUserEvent = new EventEmitter<boolean>();
}
