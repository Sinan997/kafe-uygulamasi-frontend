import { Routes } from '@angular/router';
import { isLoggedIn } from 'core';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { DashboardPageComponent } from './components/dashboard-page/dashboard-page.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardPageComponent, canActivate: [isLoggedIn] },
  { path: 'category', loadChildren: () => import('category').then((m) => m.CATEGORY_ROUTES) },
  {
    path: 'account',
    loadChildren: () => import('account').then((m) => m.ACCOUNT_ROUTES),
  },
  {
    path: 'menu',
    loadChildren: () => import('menu').then((m) => m.MENU_ROUTES),
  },
  {
    path: 'qrcode',
    loadChildren: () => import('qrcode').then((m) => m.QRCODE_ROUTES),
  },
  {
    path: 'identity',
    loadChildren: () => import('identity').then((m) => m.IDENTITY_ROUTES),
    canActivate: [isLoggedIn],
  },
  {
    path: 'business-management',
    loadChildren: () => import('business-management').then((m) => m.BUSINESS_MANAGEMENT_ROUTES),
    canActivate: [isLoggedIn],
  },
  { path: '**', component: ErrorPageComponent },
];
