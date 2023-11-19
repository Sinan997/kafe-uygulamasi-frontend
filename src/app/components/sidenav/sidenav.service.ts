// import { Injectable, WritableSignal, inject, signal } from '@angular/core';
// import { INavbarData } from './helper';
// import { MenuService } from 'menu';

// @Injectable({
//   providedIn: 'root',
// })
// export class SidenavService {
//   menuService = inject(MenuService);

//   navdata: WritableSignal<INavbarData[]> = signal([
//     { routeLink: 'view', icon: 'fal fa-home', label: 'View' },
//     { routeLink: 'generate', icon: 'fal fa-qrcode', label: 'Generate Qr' },
//     {
//       routeLink: 'menu',
//       icon: 'fal fa-bars',
//       label: 'Menu',
//     },
//   ]);

//   constructor() {
//     this.updateCategories();
//   }

//   updateCategories() {
//     this.menuService.getAllCategories().subscribe((res) => {
//       let categories: INavbarData = {
//         routeLink: 'category',
//         icon: 'fal fa-book',
//         label: 'Categories',
//         items: [],
//       };
//       res.categories.forEach((category) => {
//         categories.items?.push({ routeLink: 'category/' + category._id, label: category.title });
//       });
//       this.navdata.update((val) => [...val, categories]);
//     });
//   }
// }
