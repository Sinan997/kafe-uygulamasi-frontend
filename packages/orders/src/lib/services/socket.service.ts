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
  setOrderReadyLink = signal('');
  notificationLink = signal('');
  newOrderLink = signal('');
  orderDeliveredLink = signal('');

  private setOrderReady = signal('');
  idOfSettedReadyOrder = computed(() => this.setOrderReady());

  private setOrderAdded = signal<OrderModel | undefined>(undefined);
  addedOrder = computed(() => this.setOrderAdded());

  private setOrderDelivered = signal('');
  deliveredOrder = computed(() => this.setOrderDelivered());

  constructor() {
    console.log('start listening');

    this.authService.userSubject.subscribe((user) => {
      if (user && user?.businessId && user?.role !== Roles.Admin) {
        console.log('really started');
        this.user.set(user);
        this.startListening();
      }
    });
  }

  startListening() {
    this.notificationLink.set(this.user().businessId._id + 'notification');
    this.setOrderReadyLink.set(this.user().businessId._id + 'setorderready');
    this.newOrderLink.set(this.user().businessId._id + 'neworder');
    this.orderDeliveredLink.set(this.user().businessId._id + 'orderdelivered');

    this.listenSetOrderReady();
    this.listenNewOrder();
    this.listenSetOrderDelivered();
  }

  listenNewOrder() {
    this.socket.on(this.newOrderLink(), (order: OrderModel) => {
      this.setOrderAdded.set(order);
    });
  }

  listenSetOrderReady() {
    if (this.authService.userValue?.role === 'waiter') {
      this.socket.on(this.notificationLink(), (notification: NotificationModel) => {
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

    this.socket.on(this.setOrderReadyLink(), (orderId) => {
      this.setOrderReady.set(orderId);
    });
  }

  listenSetOrderDelivered() {
    this.socket.on(this.orderDeliveredLink(), (orderId) => {
      this.setOrderDelivered.set(orderId);
    });
  }
}
