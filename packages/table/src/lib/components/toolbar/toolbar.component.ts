import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-table-toolbar',
  templateUrl: 'toolbar.component.html',
  standalone: true,
  imports: [ToolbarModule, TranslateModule]
})

export class TableToolbarComponent {}