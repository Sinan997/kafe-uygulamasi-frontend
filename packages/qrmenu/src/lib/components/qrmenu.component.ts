import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { QrMenuToolbarComponent } from './toolbar/toolbar.component';
import { QrMenuService } from '../services/qrmenu.service';
import { CategoryModel } from 'menu';
import { QrMenuListComponent } from './menu-list/menu-list.component';

@Component({
  selector: 'qrmenu-qrmenu',
  standalone: true,
  imports: [QrMenuToolbarComponent, QrMenuListComponent],
  templateUrl: './qrmenu.component.html',
})
export class QrmenuComponent {
  protected readonly qrMenuService = inject(QrMenuService);
  protected readonly router = inject(Router);

  businessName = signal('');
  categoriesAndProducts = signal<CategoryModel[]>([]);

  ngOnInit(): void {
    this.businessName.set(this.router.url.split('/')[2]);
    this.qrMenuService.getCategoriesAndProducts(this.businessName()).subscribe((res) => {
      const manipulatedCategories = res.categories
        .sort((a, b) => a.index - b.index)
        .map((category) => {
          category.products = category.products.sort((a, b) => a.index - b.index);
          return category;
        });

      this.categoriesAndProducts.set(manipulatedCategories);
    });
  }
}
