import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { INavbarData } from '../components/sidenav/helper';
import { MenuService } from 'menu';
import { AuthService, DecodedUserTokenModel } from 'core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  menuService = inject(MenuService);
  authService = inject(AuthService);

  user: DecodedUserTokenModel | undefined;

  allRoutes = [
    { routeLink: 'business-management', icon: 'fal fa-address-book', label: 'business.businessManagement', role: 'admin' },
    { routeLink: 'identity', icon: 'fal fa-address-book', label: 'identity.identityManagement', role: 'business' },
    { routeLink: 'dashboard', icon: 'fal fa-home', label: 'Dashboard', role: 'business' },
    { routeLink: 'qrcode', icon: 'fal fa-qrcode', label: 'logout', role: 'business' },
    {
      routeLink: 'menu',
      icon: 'fal fa-bars',
      label: 'Menu',
      role: 'business',
    },
  ];

  navdata: WritableSignal<INavbarData[]> = signal(this.allRoutes);

  constructor() {
    this.authService.userSubject.subscribe((user) => {
      this.user = user;
      this.resetNavdata();
      if (user) {
        this.filterNavdata();
        if (user.role === 'business') {
          this.updateCategories();
        }
      }
    });
  }

  resetNavdata() {
    this.navdata.set(this.allRoutes);
  }

  filterNavdata() {
    this.navdata.set(this.navdata().filter((route) => route.role === this.user?.role));
  }

  updateCategories() {
    this.menuService.getAllCategories().subscribe((res) => {
      if (!res.categories.length) {
        this.resetNavdata();
        return;
      }
      let categories: INavbarData = {
        routeLink: 'category',
        icon: 'fal fa-book',
        label: 'Categories',
        items: [],
        role: 'business',
      };

      res.categories.sort((a, b) => a.index - b.index);

      res.categories.forEach((category) => {
        categories.items?.push({
          routeLink: 'category/' + category._id,
          label: category.name,
          role: 'business',
        });
      });

      this.navdata.update((routes) => {
        let isIncluded;
        routes.forEach((route) => {
          if (route.routeLink === 'category') {
            isIncluded = true;
          }
        });
        if (isIncluded) {
          const mappedRoutes = routes.map((route) =>
            route.routeLink === 'category' ? categories : route,
          );
          return [...mappedRoutes];
        }
        return [...routes, categories];
      });
    });
  }
}
