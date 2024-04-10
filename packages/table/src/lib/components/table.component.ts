import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTableComponent } from './new-table/new-table.component';
import { TableToolbarComponent } from './toolbar/toolbar.component';
import { TableModel } from '../models/table.model';
import { TableService } from '../services/table.service';
import { AllTablesComponent } from './all-tables/all-tables.component';
import { tap } from 'rxjs';
import { PermissionDirective } from 'core';

@Component({
  selector: 'lib-table',
  standalone: true,
  imports: [
    CommonModule,
    NewTableComponent,
    TableToolbarComponent,
    AllTablesComponent,
    PermissionDirective,
  ],
  templateUrl: './table.component.html',
})
export class TableComponent implements OnInit {
  protected readonly service = inject(TableService);
  tables: TableModel[] = [];

  ngOnInit(): void {
    this.getTables();
  }

  getTables() {
    this.service
      .getTables()
      .pipe(
        tap((res) => {
          this.tables = res.tables.sort((a, b) => {
            return Number(a.name.split(' ')[1]) - Number(b.name.split(' ')[1]);
          });
        }),
      )
      .subscribe();
  }
}
