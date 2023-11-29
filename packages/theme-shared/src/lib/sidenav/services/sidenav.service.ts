import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { INavbarData } from '../components/sidenav/helper';
import { MenuService } from 'menu';
import { AuthService } from 'core';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  menuService = inject(MenuService);
  authService = inject(AuthService);

  role = this.authService.userValue?.role;

  navdata: WritableSignal<INavbarData[]> = signal([
    { routeLink: 'identity', icon: 'fal fa-address-book', label: 'Identity', role: 'admin' },
    { routeLink: 'dashboard', icon: 'fal fa-home', label: 'Dashboard', role: 'business' },
    { routeLink: 'generate', icon: 'fal fa-qrcode', label: 'Generate Qr', role: 'business' },
    {
      routeLink: 'menu',
      icon: 'fal fa-bars',
      label: 'Menu',
      role: 'business',
    },
  ]);

  constructor() {
    this.filterNavdata();
    if(this.role === 'business'){
      this.updateCategories();
    }
  }

  filterNavdata() {
    this.navdata.set(this.navdata().filter((route) => route.role === this.role));
  }

  updateCategories() {
    this.menuService.getAllCategories().subscribe((res) => {
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
          label: category.title,
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
