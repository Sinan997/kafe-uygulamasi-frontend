import { Component } from '@angular/core';
import { OrderToolbarComponent } from './toolbar/toolbar.component';
import { OrdersListComponent } from './orders-list/orders-list.component';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [OrderToolbarComponent, OrdersListComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent {}
