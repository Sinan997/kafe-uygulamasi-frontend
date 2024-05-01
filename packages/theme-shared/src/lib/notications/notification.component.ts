import { Component, OnInit, inject, signal } from '@angular/core';
import { AuthService } from 'core';
import { SocketIOService } from 'orders';

@Component({
  standalone: true,
  selector: 'app-notifications-dropdown',
  template: `
    <div class="me-4">
      <button
        type="button"
        class="btn btn-primary position-relative"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="fa-regular fa-bell"></i>
        @if (notificationCount()) {
          <span
            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
          >
            {{ notificationCount() }}
            <span class="visually-hidden">unread messages</span>
          </span>
        }
      </button>
      @if (notificationCount()) {
        <ul class="dropdown-menu">
          @for (item of auth.userValue?.notifications; track $index; let last = $last) {
            <li class="dropdown-item" style="width: 300px;">
              <div class="d-flex justify-content-between">
                <span>
                  {{ item.quantity }}
                  {{ item.productName }}
                </span>
                <span>
                  {{ item.tableName }}
                </span>
              </div>
            </li>
            <li><hr class="dropdown-divider" /></li>
          }
          <li class="dropdown-item">Clear All notifications</li>
        </ul>
      }
    </div>
  `,
})
export class NotificationsDropdownComponent implements OnInit {
  auth = inject(AuthService);
  notService = inject(SocketIOService);

  notificationCount = signal(0);

  ngOnInit(): void {
    this.calculateUnreadNotifications();
  }

  calculateUnreadNotifications() {
    this.auth.userSubject.subscribe((value) => {
      this.notificationCount.set(value?.notifications?.filter((n) => !n.isRead).length || 0);
    });
  }
}
