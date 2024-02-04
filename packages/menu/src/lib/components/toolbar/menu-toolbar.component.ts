import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-menu-toolbar',
  standalone: true,
  templateUrl: './menu-toolbar.component.html',
  imports: [ToolbarModule, TranslateModule],
})
export class MenuToolbarComponent {
  @Output() addNewCategoryEvent = new EventEmitter<boolean>();
}
