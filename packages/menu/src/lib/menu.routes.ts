import { Routes } from '@angular/router';
import { MenuComponent } from './components';
import { EditCategoryOrAddProductComponent } from './components/edit-category-or-add-product-page/edit-category-add-product.component';

export const MENU_ROUTES: Routes = [
  { path: '', component: MenuComponent },
  { path: 'category/:id', component: EditCategoryOrAddProductComponent },
];
