import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { INavbarData } from '../components/sidenav/helper';
import { AuthService, DecodedUserTokenModel } from 'core';
import { sidenavRoutes } from '../components/sidenav/sidenav.routes';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  authService = inject(AuthService);

  user: DecodedUserTokenModel | undefined;
  allRoutes = sidenavRoutes;
  navdata: WritableSignal<INavbarData[]> = signal(this.allRoutes);

  constructor() {
    this.authService.userSubject.subscribe((user) => {
      this.user = user;
      this.resetNavdata();
      if (user) {
        this.filterNavdata();
      }
    });
  }

  resetNavdata() {
    this.navdata.set(this.allRoutes);
  }

  filterNavdata() {
    this.navdata.update((routes) => {
      return routes.filter((route) =>
        route.role ? route.role.find((role) => role === this.user?.role) : true,
      );
    });
  }
}
