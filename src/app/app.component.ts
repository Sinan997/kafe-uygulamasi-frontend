import { Component } from '@angular/core';
import { AuthService } from 'core';
import { sidebarPageModel } from './models/sidebar-page-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isSidebarOpen: boolean = false;
  pages: sidebarPageModel[] = [];

  constructor(public authService: AuthService) {}

  handleSidebar(val: boolean) {
    this.isSidebarOpen = val;
  }

  logout() {
    this.authService.logout();
  }
}
