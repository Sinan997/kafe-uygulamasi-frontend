import { Component, Input, OnInit, Signal, computed, inject, input } from '@angular/core';
import { SidenavService } from '../../services';
import { INavbarData } from '../sidenav/helper';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from 'core';
import { Router, RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-mobile-navbar',
  templateUrl: 'mobile-navbar.component.html',
  styleUrl: 'mobile-navbar.component.scss',
  imports: [TranslateModule, RouterLink, NgClass],
  standalone: true
})

export class MobileNavbarComponent implements OnInit {
  protected readonly sidenavService = inject(SidenavService);
  protected readonly authService = inject(AuthService);
  protected readonly router = inject(Router);
  @Input() screenWidth = 0;

  navData: Signal<INavbarData[]>;
  showAll: boolean = false;

  ngOnInit() {
    this.navData = computed(() => this.sidenavService.navdata());
  }

  logout() {
    this.authService.logout();
  }

  openRoutes() {
    this.showAll = !this.showAll;
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }
}