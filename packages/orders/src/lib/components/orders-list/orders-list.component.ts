import { Component, OnInit, effect, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { tap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { CustomMessageService } from 'theme-shared';
import { OrdersService } from '../../services/orders.service';
import { OrderModel } from '../../models/order.model';
import { SocketIOService } from '../../services/socket.service';

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
    effect(
      () => {
        if (this.socketIOService.idOfSettedReadyOrder()) {
          this.orders.update((orders) =>
            orders.map((order) => {
              if (order._id === this.socketIOService.idOfSettedReadyOrder()) {
                order.isReady = true;
              }

              return order;
            }),
          );
        }
      },
      { allowSignalWrites: true },
    );

    effect(
      () => {
        if (this.socketIOService.addedOrder()) {
          this.addOrderToList(this.socketIOService.addedOrder()!);
        }
      },
      { allowSignalWrites: true },
    );

    effect(
      () => {
        if (this.socketIOService.deliveredOrder()) {
          this.removeOrderFromList(this.socketIOService.deliveredOrder());
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    this.getOrders();
  }

  addOrderToList(order: OrderModel) {
    this.orders.update((orders) => [order, ...orders]);
  }

  removeOrderFromList(orderId: string) {
    this.orders.update((orders) => orders.filter((order) => order._id !== orderId));
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
