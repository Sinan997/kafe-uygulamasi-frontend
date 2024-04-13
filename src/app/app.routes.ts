import { Routes } from '@angular/router';
import { isLoggedIn, isAdmin, isBusiness, emptyRouter } from 'core';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { EmptyComponent } from './empty.component';

export const routes: Routes = [
  { path: '', component: EmptyComponent, canActivate: [emptyRouter] },
  {
    path: 'account',
    loadChildren: () => import('account').then((m) => m.ACCOUNT_ROUTES),
  },
  {
    path: 'business-management',
    loadChildren: () => import('business-management').then((m) => m.BUSINESS_MANAGEMENT_ROUTES),
    canActivate: [isAdmin],
  },
  {
    path: 'dashboard',
    loadChildren: () => import('dashboard').then((m) => m.DASHBOARD_ROUTES),
    canActivate: [isBusiness],
  },
  {
    path: 'identity',
    loadChildren: () => import('identity').then((m) => m.IDENTITY_ROUTES),
    canActivate: [isBusiness],
  },
  {
    path: 'menu',
    loadChildren: () => import('menu').then((m) => m.MENU_ROUTES),
    canActivate: [isBusiness],
  },
  {
    path: 'qrcode',
    loadChildren: () => import('qrcode').then((m) => m.QRCODE_ROUTES),
    canActivate: [isBusiness],
  },
  {
    path: 'table',
    loadChildren: () => import('table').then((m) => m.TABLE_ROUTES),
    canActivate: [isLoggedIn],
  },
  {
    path: 'orders',
    loadChildren: () => import('orders').then((m) => m.ORDERS_ROUTES),
    canActivate: [isLoggedIn],
  },
  {
    path: 'qrmenu/:id',
    loadChildren: () => import('qrmenu').then((m) => m.QRMENU_ROUTES),
  },
  { path: '**', component: ErrorPageComponent },
];
