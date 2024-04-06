import { Injectable, computed, inject, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { io } from 'socket.io-client';
import { AuthService, SOCKET_URL } from 'core';

@Injectable({
  providedIn: 'root',
})
export class SocketIOService {
  private authService = inject(AuthService);
  private socket = io(inject(SOCKET_URL));
  user = this.authService.getUser();

  private isOrderAdded = signal('');
  isOrderUpdated = computed(() => {
    return this.isOrderAdded();
  });

  constructor() {
    this.socket.on(this.user!.businessId._id, (orderId) => {
      this.isOrderAdded.set(orderId);
    });
  }
}
