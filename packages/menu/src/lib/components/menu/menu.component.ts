import { Component, inject } from '@angular/core';
import { categoryModel } from '../../models/category';
import { MessageService } from 'primeng/api';
import { MenuService } from '../../services/menu.service';
import { MenuToolbarComponent } from './toolbar/menu-toolbar.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { NgIf } from '@angular/common';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [NgIf, MenuToolbarComponent, NewCategoryComponent, CategoriesTableComponent],
})
export class MenuComponent {
  visibleNewCategoryDialog = false;

  messageService = inject(MessageService);
  menuService = inject(MenuService);

  openNewCategoryDialog() {
    this.visibleNewCategoryDialog = true;
  }

  categories: categoryModel[] = [];

  updateCategoryPlacement(categories: categoryModel[]) {
    this.categories = categories;

    this.setIndexToCategories();
    this.setCategoryPlacement();
  }

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.menuService.getAllCategories().subscribe((res) => {
      this.categories = res.categories;
      this.sortCategoriesByIndexLocally();
    });
  }

  setIndexToCategories() {
    this.categories = this.categories.map((category, index) => {
      category.index = index;
      return category;
    });
  }

  sortCategoriesByIndexLocally() {
    this.categories = this.categories.sort((a, b) => a.index - b.index);
  }

  setCategoryPlacement() {
    this.menuService
      .setCategoriesIndex(this.categories)
      .pipe(
        catchError((err) => {
          throw err;
        }),
      )
      .subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Sıralama değişti',
          detail: res.message,
        });
      });
  }
}
