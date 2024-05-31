import { Component, input, output } from '@angular/core';
import { TableModel } from '../../models/table.model';
import { TableItemComponent } from '../table-item/table-item.component';
@Component({
  selector: 'app-tables',
  templateUrl: 'tables.component.html',
  standalone: true,
  imports: [TableItemComponent],
})
export class TablesComponent {
  readonly tables = input.required<TableModel[]>();
  readonly updateList = output();
}
