import { Routes } from '@angular/router';
import { LoginComponent } from './components';

export const ACCOUNT_ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];
