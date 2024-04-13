import { Component, input } from '@angular/core';
import { CategoryModel } from 'menu';
import { CategoryAndProductsComponent } from '../category-and-products/category-and-products.component';

@Component({
  standalone: true,
  selector: 'app-qrmenu-list',
  templateUrl: './menu-list.component.html',
  imports: [CategoryAndProductsComponent],
})
export class QrMenuListComponent {
  categoriesAndProducts = input.required<CategoryModel[]>();
}
