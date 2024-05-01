import { Injectable, computed, inject, signal } from '@angular/core';
import { io } from 'socket.io-client';
import { AuthService, DecodedUserTokenModel, NotificationModel, Roles, SOCKET_URL } from 'core';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { OrderModel } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SocketIOService {
  protected readonly authService = inject(AuthService);
  protected readonly translateService = inject(TranslateService);
  socket = io(inject(SOCKET_URL));

  user = signal<DecodedUserTokenModel>(this.authService.userValue!);
  notificationLink = signal('');
  setOrderReadyLink = signal('');
  newOrderLink = signal('');
  orderDeliveredLink = signal('');

  private setOrderReady = signal('');
  isOrderSettedReady = computed(() => this.setOrderReady());

  private setOrderAdded = signal<OrderModel | undefined>(undefined);
  isOrderAdded = computed(() => this.setOrderAdded());

  private setOrderDelivered = signal('');
  isOrderDelivered = computed(() => this.setOrderDelivered());

  constructor() {
    if (this.user()?.businessId && this.user()?.role !== Roles.Admin) {
      this.startListening();
    }
  }

  startListening() {
    this.user.set(this.authService.userValue!);
    this.notificationLink.set(this.user().businessId._id + 'notification');
    this.setOrderReadyLink.set(this.user().businessId._id + 'setorderready');
    this.newOrderLink.set(this.user().businessId._id + 'neworder');
    this.orderDeliveredLink.set(this.user().businessId._id + 'orderdelivered');

    this.listenNotifications();
    this.listenSetOrderReady();
    this.listenNewOrder();
    this.listenSetOrderDelivered();
  }

  listenNewOrder() {
    this.socket.on(this.newOrderLink(), (order: OrderModel) => {
      console.log(order);
      this.setOrderAdded.set(order);
    });
  }

  listenSetOrderReady() {
    this.socket.on(this.setOrderReadyLink(), (orderId) => {
      this.setOrderReady.set(orderId);
    });
  }

  listenSetOrderDelivered() {
    this.socket.on(this.orderDeliveredLink(), (orderId) => {
      this.setOrderDelivered.set(orderId);
    });
  }

  listenNotifications() {
    if (this.authService.userValue?.role === 'waiter') {
      this.socket.on(this.notificationLink(), (notification: NotificationModel) => {
        // this.authService.updateNotification(notification);
        Swal.fire({
          title: this.translateService.instant('order.newOrder'),
          icon: 'info',
          text: this.translateService.instant('order.newOrderDescription', {
            productName: notification.productName,
            tableName: notification.tableName,
            quantity: notification.quantity,
          }),
        });
      });
    }
  }
}
