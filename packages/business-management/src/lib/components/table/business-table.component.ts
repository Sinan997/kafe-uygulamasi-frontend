import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
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
  @Input() businesses: BusinessModel[];
  @Output() updateList = new EventEmitter<boolean>();

  businessService = inject(BusinessManagementService);
  confirmationService = inject(ConfirmationService);
  customMessageService = inject(CustomMessageService);
  translateService = inject(TranslateService);
  business: BusinessModel;
  visibleEditBusinessDialog = false;

  openEditBusinessModal(business: BusinessModel) {
    this.visibleEditBusinessDialog = true;
    this.business = business;
  }

  deleteBusiness(business: BusinessModel) {
    this.confirmationService.confirm({
      message: this.translateService.instant('deleteBusinessMessage', { name: business.name }),
      header: this.translateService.instant('deleteBusinessHeader'),
      icon: 'pi pi-exclamation-triangle',
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
}
