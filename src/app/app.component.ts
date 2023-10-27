import { Component } from '@angular/core';
import { AuthService } from 'core';
import { sidebarPageModel } from './models/sidebar-page-model';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  // isSidebarOpen: boolean = false;
  // pages: sidebarPageModel[] = [];

  // constructor(public authService: AuthService) {}

  // handleSidebar(val: boolean) {
  //   this.isSidebarOpen = val;
  // }

  // logout() {
  //   this.authService.logout();
  // }


  title = 'sidenav-with-multilevel-menu';

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

}
