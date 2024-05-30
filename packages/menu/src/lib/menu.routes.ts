import { Routes } from '@angular/router';
import { CategoryComponent } from './components';
import { ProductComponent } from './components';

export const MENU_ROUTES: Routes = [
  { path: '', component: CategoryComponent },
  { path: 'category/:id', component: ProductComponent },
];
