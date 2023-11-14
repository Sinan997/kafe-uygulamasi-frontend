import { Routes } from '@angular/router';
import { isLoggedIn } from 'core';
import { HomeComponent } from './app/components/home/home.component';
import { ErrorPageComponent } from './app/pages/error-page/error-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [isLoggedIn] },
  // { path: 'dashboard', component: DashboardPageComponent },
  // { path: 'tables', component: TablesPageComponent },
  // { path: 'orders', component: OrdersPageComponent },
  // { path: 'menu', component: MenuPageComponent },
  // { path: 'category/:id', component: CategoryPageComponent },
  {
    path: 'account',
    loadChildren: () => import('account').then((m) => m.ACCOUNT_ROUTES),
  },
  {
    path: 'identity',
    loadChildren: () => import('identity').then((m) => m.IDENTITY_ROUTES),
    canActivate: [isLoggedIn],
  },
  { path: '**', component: ErrorPageComponent },
];
