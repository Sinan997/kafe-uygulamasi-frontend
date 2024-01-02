import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';
@Component({
  standalone: true,
  imports: [ToolbarModule, TranslateModule],
  selector: 'app-business-toolbar',
  templateUrl: './businesses-toolbar.component.html',
})
export class BusinessToolbarComponent {
  @Output() addNewBusinessEvent = new EventEmitter<boolean>();
}
