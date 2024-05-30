import { Component, computed, inject, signal } from '@angular/core';
import { tap } from 'rxjs';
import { CustomMessageService } from 'theme-shared';
import { CategoryModel } from '../models/category.model';
import { MenuToolbarComponent } from './toolbar/menu-toolbar.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-category',
  standalone: true,
  templateUrl: './category.component.html',
  imports: [MenuToolbarComponent, NewCategoryComponent, CategoriesTableComponent],
})
export class CategoryComponent {
  protected readonly customMessageService = inject(CustomMessageService);
  protected readonly menuService = inject(MenuService);

  visibleNewCategoryDialog = signal(false);
  #categories = signal<CategoryModel[]>([]);
  categories = computed(() => this.sortCategories(this.#categories()));

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.menuService
      .getCategories()
      .pipe(tap((res) => this.#categories.set(res.categories)))
      .subscribe();
  }

  updateCategoryPlacement(categories: CategoryModel[]) {
    this.#categories.set(categories);
    this.setIndexToCategories();
    this.updateCategoriesIndexHttp();
  }

  setIndexToCategories() {
    this.#categories.update((categories) => categories.map((category, index) => ((category.index = index), category)));
  }

  updateCategoriesIndexHttp() {
    this.menuService
      .setCategoriesIndex(this.categories())
      .pipe(tap((res) => this.customMessageService.success(res)))
      .subscribe();
  }

  sortCategories(categories: CategoryModel[]) {
    return categories.sort((a, b) => a.index - b.index);
  }
}
