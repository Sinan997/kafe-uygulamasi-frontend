import { Component, inject } from '@angular/core';
import { tap } from 'rxjs';
import { CategoryModel } from 'category';
import { MenuToolbarComponent } from './toolbar/menu-toolbar.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { MenuService } from '../services/menu.service';
import { CustomMessageService } from 'theme-shared';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [MenuToolbarComponent, NewCategoryComponent, CategoriesTableComponent],
})
export class MenuComponent {
  customMessageService = inject(CustomMessageService);
  menuService = inject(MenuService);

  visibleNewCategoryDialog = false;
  categories: CategoryModel[] = [];

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.menuService
      .getAllCategories()
      .pipe(
        tap((res) => {
          this.categories = res.categories;
          this.sortCategoriesByIndexLocally();
        }),
      )
      .subscribe();
  }

  updateCategoryPlacement(categories: CategoryModel[]) {
    this.categories = categories;
    this.setIndexToCategories();
    this.setCategoryPlacement();
  }

  setIndexToCategories() {
    this.categories = this.categories.map((category, index) => {
      category.index = index;
      return category;
    });
  }

  setCategoryPlacement() {
    this.menuService
      .setCategoriesIndex(this.categories)
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
        }),
      )
      .subscribe();
  }

  sortCategoriesByIndexLocally() {
    this.categories = this.categories.sort((a, b) => a.index - b.index);
  }

  openNewCategoryDialog() {
    this.visibleNewCategoryDialog = true;
  }
}
