import { Component, inject } from '@angular/core';
import { AuthService } from 'core';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { NgIf } from '@angular/common';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [SidenavComponent, BodyComponent, RouterOutlet, ToastModule, NgIf],
})
export class AppComponent {
  authService = inject(AuthService);

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: SideNavToggle): void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  logout() {
    this.authService.logout();
  }
}
