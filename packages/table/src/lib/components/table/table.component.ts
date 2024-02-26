import { Component, EventEmitter, Output, inject, input } from '@angular/core';
import { TableModel } from '../../models/table.model';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { NewOrderComponent } from '../new-order/new-order.component';
import { TableService } from '../../services/table.service';
import { tap } from 'rxjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { CustomMessageService } from 'theme-shared';

@Component({
  selector: 'app-table',
  templateUrl: 'table.component.html',
  standalone: true,
  imports: [TranslateModule, NewOrderComponent, ConfirmDialogModule],
  providers: [ConfirmationService]
})

export class TableComponent {
  protected readonly service = inject(TableService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly translateService = inject(TranslateService);
  protected readonly customMessageService = inject(CustomMessageService);
  @Output() updateList = new EventEmitter();
  table = input.required<TableModel>();

  visibleNewOrderDialog = false;

  openNewOrderDialog() {
    this.visibleNewOrderDialog = true;
  }

  openShowDetailsDialog() { }

  deleteTable() {
    this.confirmationService.confirm({
      message: this.translateService.instant('table.deleteTableMessage', {
        name: this.table().name,
      }),
      header: this.translateService.instant('table.deleteTableHeader'),
      accept: () => {
        this.service.deleteTable(this.table()._id).pipe(tap((res) => {
          this.customMessageService.success(res);
          this.updateList.emit();
        })).subscribe();
      },
    });
  }
}