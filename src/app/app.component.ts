import { Component, OnInit } from '@angular/core';
import { AuthService } from 'core';
import { sidebarPageModel } from './models/sidebar-page-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isSidebarOpen: boolean = false;
  pages: sidebarPageModel[] = [];

  constructor(public authService: AuthService) {}

  ngOnInit(): void {}

  handleSidebar(val: boolean) {
    this.isSidebarOpen = val;
  }

  logout() {
    this.authService.logout();
  }
}
