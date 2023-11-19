import { Component, EventEmitter, Output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-menu-toolbar',
  standalone: true,
  templateUrl: './menu-toolbar.component.html',
  imports: [ToolbarModule],
})
export class MenuToolbarComponent {
  @Output() addNewCategoryEvent = new EventEmitter<boolean>();
}
