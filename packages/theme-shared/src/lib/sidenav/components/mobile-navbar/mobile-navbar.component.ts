import { Component, OnInit, Signal, computed, inject, input, signal } from '@angular/core';
import { SidenavService } from '../../services';
import { INavbarData } from '../sidenav/helper';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { SublevelMenuComponent } from '../sidenav/sublevel-menu.component';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: 'mobile-navbar.component.html',
  styleUrl: 'mobile-navbar.component.scss',
  imports: [TranslateModule, RouterLink, NgClass, SublevelMenuComponent],
  standalone: true,
})
export class MobileNavbarComponent implements OnInit {
  protected readonly sidenavService = inject(SidenavService);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  screenWidth = input.required();

  navData: Signal<INavbarData[]>;
  showAll = signal(false);
  collapsed = signal(false);

  ngOnInit() {
    this.navData = computed(() => this.sidenavService.navdata());
  }

  logout() {
    this.authService.logout();
  }

  handleClick(item: INavbarData): void {
    item.expanded = !item.expanded;
    if (item.items?.length && !this.collapsed()) {
      item.expanded = true;
    }
  }

  openRoutes() {
    this.collapsed.update((val) => !val);
    this.showAll.update((val) => !val);
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }
}
