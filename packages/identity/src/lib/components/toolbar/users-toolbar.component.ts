import { Component, output } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';
@Component({
  standalone: true,
  imports: [ToolbarModule, TranslateModule],
  selector: 'app-users-toolbar',
  templateUrl: './users-toolbar.component.html',
})
export class UsersToolbarComponent {
  readonly addNewUserEvent = output();
}
