import { Injectable, WritableSignal, inject, signal } from '@angular/core';
import { INavbarData } from '../components/sidenav/helper';
import { MenuService } from 'menu';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  menuService = inject(MenuService);

  navdata: WritableSignal<INavbarData[]> = signal([
    { routeLink: 'dashboard', icon: 'fal fa-home', label: 'Dashboard' },
    { routeLink: 'generate', icon: 'fal fa-qrcode', label: 'Generate Qr' },
    {
      routeLink: 'menu',
      icon: 'fal fa-bars',
      label: 'Menu',
    },
  ]);

  constructor() {
    this.updateCategories();
  }

  updateCategories() {
    this.menuService.getAllCategories().subscribe((res) => {
      let categories: INavbarData = {
        routeLink: 'category',
        icon: 'fal fa-book',
        label: 'Categories',
        items: [],
      };

      res.categories.sort((a, b) => a.index - b.index);

      res.categories.forEach((category) => {
        categories.items?.push({ routeLink: 'category/' + category._id, label: category.title });
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
