import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { AuthService, DecodedUserTokenModel } from 'core';
import { INavbarData } from '../components/sidenav/helper';
import { sidenavRoutes } from '../components/sidenav/sidenav.routes';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  protected readonly authService = inject(AuthService);

  user = signal<DecodedUserTokenModel>({} as DecodedUserTokenModel);
  navdata: WritableSignal<INavbarData[]> = signal(sidenavRoutes);

  constructor() {
    this.authService.userSubject.subscribe((user) => {
      if (!user) {
        return;
      }

      this.user.set(user);
      this.filterNavdata();

      if (this.user().businessId) {
        this.addQrMenuRoute();
      }
    });
  }

  filterNavdata() {
    this.navdata.set(sidenavRoutes);
    this.navdata.update((routes) => {
      return routes.filter((route) => (route.role ? route.role.find((role) => role === this.user().role) : true));
    });
  }

  addQrMenuRoute() {
    this.navdata.update((routes) => [
      ...routes,
      {
        routeLink: 'qrmenu' + '/' + this.user().businessId.name,
        icon: 'fa-solid fa-map',
        label: 'qrmenu.qrmenu',
        role: ['business', 'waiter'],
      },
    ]);
  }
}
