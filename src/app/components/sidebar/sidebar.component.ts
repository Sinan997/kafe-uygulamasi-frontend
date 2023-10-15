import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { sidebarPageModel } from 'src/app/models/sidebar-page-model';
import { User } from 'src/app/models/user-model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() isSidebarOpenEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();
  pages: sidebarPageModel[] = [];
  user!: User;
  isSidebarOpen?: boolean;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    localStorage.setItem('isSidebarOpen', JSON.stringify(this.isSidebarOpen));
    this.isSidebarOpenEvent.emit(this.isSidebarOpen);
  }

  ngOnInit(): void {
    this.pages = [
      { path: 'dashboard', class: 'bx bx-grid-alt', label: 'Panel' },
      { path: 'tables', class: 'bx bx-table', label: 'Masalar' },
      { path: 'waiter', class: 'bx bx-male', label: 'Garson' },
      { path: 'orders', class: 'bx bx-restaurant', label: 'Siparişler' },
      { path: 'menu', class: 'bx bxs-food-menu', label: 'Menü' },
    ];
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.isSidebarOpenEvent.emit(this.isSidebarOpen);
  }
}
