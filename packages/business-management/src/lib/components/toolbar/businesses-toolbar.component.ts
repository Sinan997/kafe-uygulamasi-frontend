import { Component, output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  standalone: true,
  imports: [ToolbarModule, TranslateModule],
  selector: 'app-business-toolbar',
  templateUrl: './businesses-toolbar.component.html',
})
export class BusinessToolbarComponent {
  addNewBusinessEvent = output();
}
