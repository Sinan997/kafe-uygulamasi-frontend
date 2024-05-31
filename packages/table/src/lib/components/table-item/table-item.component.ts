import { Component, inject, input, output, signal } from '@angular/core';
import { tap } from 'rxjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomMessageService } from 'theme-shared';
import { PermissionDirective } from 'core';
import { TableModel } from '../../models/table.model';
import { NewOrderComponent } from '../new-order/new-order.component';
import { TableService } from '../../services/table.service';
import { EditTableComponent } from '../edit-table/edit-table.component';
import { TableDetailsComponent } from '../table-details/table-details.component';

@Component({
  selector: 'app-table-item',
  templateUrl: 'table-item.component.html',
  standalone: true,
  imports: [TranslateModule, NewOrderComponent, ConfirmDialogModule, EditTableComponent, TableDetailsComponent, PermissionDirective],
  providers: [ConfirmationService],
})
export class TableItemComponent {
  protected readonly service = inject(TableService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly translateService = inject(TranslateService);
  protected readonly customMessageService = inject(CustomMessageService);

  readonly updateList = output();
  readonly table = input.required<TableModel>();

  visibleNewOrderDialog = signal(false);
  visibleEditTableDialog = signal(false);
  visibleDetailsDialog = signal(false);

  deleteTable() {
    this.confirmationService.confirm({
      message: this.translateService.instant('table.deleteTableMessage', {
        name: this.table().name,
      }),
      icon: 'fa-solid fa-triangle-exclamation',
      accept: () => {
        this.service
          .deleteTable(this.table()._id)
          .pipe(
            tap((res) => {
              this.customMessageService.success(res);
              this.updateList.emit();
            }),
          )
          .subscribe();
      },
    });
  }
}
