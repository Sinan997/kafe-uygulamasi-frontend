import { Routes } from '@angular/router';
import { isLoggedIn } from 'core';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { CategoryComponent } from 'category';

export const routes: Routes = [
  { path: '', redirectTo: 'view', pathMatch: 'full' },
  // { path: 'dashboard', component: DashboardPageComponent, canActivate: [isLoggedIn] },
  // { path: 'tables', component: TablesPageComponent },
  // { path: 'orders', component: OrdersPageComponent },
  // { path: 'menu', component: MenuPageComponent },
  { path: 'category', loadChildren: () => import('category').then((m) => m.CATEGORY_ROUTES) },
  {
    path: 'account',
    loadChildren: () => import('account').then((m) => m.ACCOUNT_ROUTES),
  },
  {
    path: 'menu',
    loadChildren: () => import('menu').then((m) => m.MENU_ROUTES),
  },
  // {
  //   path: 'identity',
  //   loadChildren: () => import('identity').then((m) => m.IDENTITY_ROUTES),
  //   canActivate: [isLoggedIn],
  // },
  { path: '**', component: ErrorPageComponent },
];
