import { Routes } from '@angular/router';
import { isLoggedIn, isAdmin, isBusiness, emptyRouter } from 'core';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { EmptyComponent } from './empty.component';

export const routes: Routes = [
  { path: '', component: EmptyComponent, canActivate: [emptyRouter] },
  {
    path: 'dashboard',
    loadChildren: () => import('dashboard').then((m) => m.DASHBOARD_ROUTES),
    canActivate: [isBusiness],
  },
  {
    path: 'business-management',
    loadChildren: () => import('business-management').then((m) => m.BUSINESS_MANAGEMENT_ROUTES),
    canActivate: [isAdmin],
  },
  {
    path: 'identity',
    loadChildren: () => import('identity').then((m) => m.IDENTITY_ROUTES),
    canActivate: [isLoggedIn],
  },
  {
    path: 'account',
    loadChildren: () => import('account').then((m) => m.ACCOUNT_ROUTES),
  },
  {
    path: 'menu',
    loadChildren: () => import('menu').then((m) => m.MENU_ROUTES),
    canActivate: [isLoggedIn],
  },
  {
    path: 'table',
    loadChildren: () => import('table').then((m) => m.TABLE_ROUTES),
    canActivate: [isLoggedIn],
  },
  {
    path: 'qrcode',
    loadChildren: () => import('qrcode').then((m) => m.QRCODE_ROUTES),
    canActivate: [isLoggedIn],
  },
  {
    path: 'orders',
    loadChildren: () => import('orders').then((m) => m.ORDERS_ROUTES),
    canActivate: [isLoggedIn],
  },

  { path: '**', component: ErrorPageComponent },
];
