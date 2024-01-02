import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { BusinessModel } from '../../models/business.model';
import { BusinessManagementService } from '../../services/business-management.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EditBusinessComponent } from '../edit-business/edit-business.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomMessageService } from 'theme-shared';

@Component({
  selector: 'app-business-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    TagModule,
    ConfirmDialogModule,
    EditBusinessComponent,
    TranslateModule
  ],
  templateUrl: './business-table.component.html',
})
export class BusinessTableComponent {
  @Input() businesses: BusinessModel[];
  @Output() updateList = new EventEmitter<boolean>();

  businessService = inject(BusinessManagementService);
  confirmationService = inject(ConfirmationService);
  customMessageService = inject(CustomMessageService);

  business: BusinessModel;
  visibleEditBusinessDialog = false;

  openEditBusinessModal(business: BusinessModel) {
    this.visibleEditBusinessDialog = true;
    this.business = business;
  }

  deleteBusiness(business: BusinessModel) {
    this.confirmationService.confirm({
      message: business.name + ' Kullanıcısını silmek istediğine emin misin?',
      header: 'Kullanıcı Silme',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.businessService
          .deleteBusiness(business._id)
          .subscribe((val) => {
            this.customMessageService.success(val.code);
            this.updateList.emit();
          });
      },
    });
  }
}
