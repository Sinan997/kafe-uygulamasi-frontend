import { Component } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-tables-page',
  templateUrl: './tables-page.component.html',
  styleUrls: ['./tables-page.component.scss'],
  providers:[MessageService,ConfirmationService]
})
export class TablesPageComponent {

}
