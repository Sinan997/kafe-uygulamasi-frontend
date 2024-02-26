import { Component, EventEmitter, Output, input } from '@angular/core';
import { TableModel } from '../../models/table.model';
import { TableComponent } from '../table/table.component';
@Component({
  selector: 'app-all-tables',
  templateUrl: 'all-tables.component.html',
  standalone: true,
  imports: [TableComponent]
})

export class AllTablesComponent{
  tables = input.required<TableModel[]>();
  @Output() updateList = new EventEmitter();
}