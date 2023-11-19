import { Routes } from '@angular/router';
import { CategoryComponent } from './components';

export const CATEGORY_ROUTES: Routes = [
  { path: ':id', component: CategoryComponent },
];
