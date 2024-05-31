import { Component, OnInit, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { PermissionDirective } from 'core';
import { NewTableComponent } from './new-table/new-table.component';
import { TableToolbarComponent } from './toolbar/toolbar.component';
import { TableModel } from '../models/table.model';
import { TableService } from '../services/table.service';
import { TablesComponent } from './tables/tables.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [NewTableComponent, TableToolbarComponent, TablesComponent, PermissionDirective],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  protected readonly service = inject(TableService);

  tables = signal<TableModel[]>([]);

  ngOnInit(): void {
    this.getTables();
  }

  getTables() {
    this.service
      .getTables()
      .pipe(
        tap((res) => {
          this.tables.set(
            res.tables.sort((a, b) => {
              return Number(a.name.split(' ')[1]) - Number(b.name.split(' ')[1]);
            }),
          );
        }),
      )
      .subscribe();
  }
}
