import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { OrderModel } from '../../models/order.model';
import { SocketIOService } from '../../services/socket.service';
import { NgClass } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { tap } from 'rxjs';
import { CustomMessageService } from 'theme-shared';

@Component({
  standalone: true,
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  imports: [NgClass, TranslateModule],
})
export class OrdersListComponent implements OnInit {
  protected readonly service = inject(OrdersService);
  protected readonly socketIOService = inject(SocketIOService);
  protected readonly customMessageService = inject(CustomMessageService);
  orders = signal<OrderModel[]>([]);

  constructor() {
    effect(() => {
      if (this.socketIOService.isOrderUpdated()) {
        this.getOrders();
      }
    });
  }

  ngOnInit(): void {
    if (!this.socketIOService.isOrderUpdated()) {
      this.getOrders();
    }
  }

  getOrders() {
    this.service.getOrders().subscribe((res) => {
      this.orders.set(res.orders.reverse().filter((order) => !order.isDelivered));
    });
  }

  setOrderReady(order: OrderModel) {
    if (order.isReady) return this.customMessageService.error('error.ORDER_IS_ALREADY_READY');
    this.service
      .setOrderReady(order._id)
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
        }),
      )
      .subscribe();
  }

  setOrderDelivered(order: OrderModel) {
    this.service
      .setOrderDelivered(order._id)
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
        }),
      )
      .subscribe();
  }
}
