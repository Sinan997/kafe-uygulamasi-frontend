import { Component, input } from '@angular/core';
import { TableModel } from '../../models/table.model';
import { TranslateModule } from '@ngx-translate/core';
import { NewOrderComponent } from '../new-order/new-order.component';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  standalone: true,
  imports: [TranslateModule, NewOrderComponent]
})

export class TableComponent {
  table = input.required<TableModel>();

  visibleNewOrderDialog = false;

  openNewOrderDialog() { 
    this.visibleNewOrderDialog = true;
  }

  openShowDetailsDialog() { }
}