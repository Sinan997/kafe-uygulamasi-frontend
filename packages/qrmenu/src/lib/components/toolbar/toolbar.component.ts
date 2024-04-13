import { Component, input } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  standalone: true,
  selector: 'app-qrmenu-toolbar',
  templateUrl: './toolbar.component.html',
  imports: [ToolbarModule],
})
export class QrMenuToolbarComponent {
  businessName = input.required();
}
