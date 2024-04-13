import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryModel } from 'menu';

@Component({
  standalone: true,
  selector: 'app-category-and-products',
  templateUrl: './category-and-products.component.html',
  styleUrl: `./category-and-products.component.scss`,
  imports: [TranslateModule, NgClass],
})
export class CategoryAndProductsComponent {
  category = input.required<CategoryModel>();
}
