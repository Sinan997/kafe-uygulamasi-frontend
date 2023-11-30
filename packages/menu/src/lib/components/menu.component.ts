import { Component, inject } from '@angular/core';
import { catchError } from 'rxjs';
import { SidenavService } from 'theme-shared';
import { MessageService } from 'primeng/api';
import { CategoryModel } from 'category';
import { MenuToolbarComponent } from './toolbar/menu-toolbar.component';
import { NewCategoryComponent } from './new-category/new-category.component';
import { CategoriesTableComponent } from './categories-table/categories-table.component';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [MenuToolbarComponent, NewCategoryComponent, CategoriesTableComponent],
})
export class MenuComponent {
  messageService = inject(MessageService);
  menuService = inject(MenuService);
  sidenavService = inject(SidenavService);

  visibleNewCategoryDialog = false;
  categories: CategoryModel[] = [];

  ngOnInit(): void {
    this.get();
  }

  get() {
    this.menuService.getAllCategories().subscribe((res) => {
      this.categories = res.categories;
      this.sortCategoriesByIndexLocally();
    });
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

        this.sidenavService.updateCategories();
      });
  }

  openNewCategoryDialog() {
    this.visibleNewCategoryDialog = true;
  }
}
