import { Component, OnInit, inject } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { BusinessManagementService } from '../services/business-management.service';
import { NewBusinessComponent } from './new-business/new-business.component';
import { BusinessTableComponent } from './table/business-table.component';
import { BusinessToolbarComponent } from './toolbar/businesses-toolbar.component';
import { BusinessModel } from '../models/business.model';
@Component({
  selector: 'app-business-management',
  templateUrl: './business.component.html',
  providers: [ConfirmationService],
  standalone: true,
  imports: [BusinessToolbarComponent, BusinessTableComponent, NewBusinessComponent],
})
export class BusinessManagementComponent implements OnInit {
  visibleNewBusinessDialog = false;
  businessService = inject(BusinessManagementService);
  businesses: BusinessModel[] = [];

  openNewBusinessModal() {
    this.visibleNewBusinessDialog = true;
  }

  ngOnInit(): void {
    this.getBusinesses();
  }

  getBusinesses() {
    this.businessService.getBusinesses().subscribe((result) => {
      this.businesses = result.businesses;
    });
  }
}
