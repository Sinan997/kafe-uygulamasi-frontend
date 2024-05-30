import { Component, inject, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { BusinessModel } from '../../models/business.model';
import { BusinessManagementService } from '../../services/business-management.service';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditBusinessComponent } from '../edit-business/edit-business.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomMessageService } from 'theme-shared';
import { tap } from 'rxjs';

@Component({
  selector: 'app-business-table',
  standalone: true,
  imports: [CommonModule, TableModule, ConfirmDialogModule, EditBusinessComponent, TranslateModule],
  templateUrl: './business-table.component.html',
})
export class BusinessTableComponent {
  protected readonly businessService = inject(BusinessManagementService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly customMessageService = inject(CustomMessageService);
  protected readonly translateService = inject(TranslateService);

  readonly businesses = input.required<BusinessModel[]>();
  readonly updateList = output();

  selectedBusiness = signal<BusinessModel>({} as BusinessModel);
  visibleEditBusinessDialog = signal(false);

  openEditBusinessModal(business: BusinessModel) {
    this.visibleEditBusinessDialog.set(true);
    this.selectedBusiness.set(business);
  }

  deleteBusiness(business: BusinessModel) {
    this.confirmationService.confirm({
      message: this.translateService.instant('business.deleteBusinessMessage', {
        name: business.name,
      }),
      icon: 'fa-solid fa-triangle-exclamation',
      accept: () => {
        this.businessService
          .deleteBusiness(business._id)
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

  clear(table: Table, input: HTMLInputElement) {
    table.clear();
    input.value = '';
  }
}
