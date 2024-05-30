import { Component, OnInit, inject, signal } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { tap } from 'rxjs';
import { BusinessManagementService } from '../services/business-management.service';
import { NewBusinessComponent } from './new-business/new-business.component';
import { BusinessTableComponent } from './table/business-table.component';
import { BusinessToolbarComponent } from './toolbar/businesses-toolbar.component';
import { BusinessModel } from '../models/business.model';
@Component({
  selector: 'app-business-management',
  standalone: true,
  templateUrl: './business.component.html',
  imports: [BusinessToolbarComponent, BusinessTableComponent, NewBusinessComponent],
  providers: [ConfirmationService],
})
export class BusinessManagementComponent implements OnInit {
  protected readonly service = inject(BusinessManagementService);

  businesses = signal<BusinessModel[]>([]);
  visibleNewBusinessDialog = signal(false);

  openNewBusinessModal() {
    this.visibleNewBusinessDialog.set(true);
  }

  ngOnInit(): void {
    this.getBusinesses();
  }

  getBusinesses() {
    this.service
      .getBusinesses()
      .pipe(tap((res) => this.businesses.set(res.businesses)))
      .subscribe();
  }
}
