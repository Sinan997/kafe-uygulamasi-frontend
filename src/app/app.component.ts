import { Component, inject } from '@angular/core';
import { AuthService } from 'core';
import { SidenavComponent, BodyComponent } from 'theme-shared';
import { RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { NgIf } from '@angular/common';
import { DisabledDirective } from './disabled.directive';
import { MobileNavbarComponent } from 'packages/theme-shared/src/lib/sidenav/components/mobile-navbar/mobile-navbar.component';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [SidenavComponent,MobileNavbarComponent, BodyComponent, RouterOutlet, ToastModule, NgIf, DisabledDirective],
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
    this.isSideNavCollapsed = false;
    this.authService.logout();
  }
}
