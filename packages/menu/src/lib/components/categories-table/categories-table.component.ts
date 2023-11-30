import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';
import { SidenavService } from 'theme-shared';
import { CategoryModel } from '../../../../../category/src/lib/models/category.model';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-categories-table',
  standalone: true,
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss',
  imports: [CdkDropList, CdkDrag],
})
export class CategoriesTableComponent {
  @Input() categories: CategoryModel[] = [];
  @Output() updateCategoriesList = new EventEmitter<boolean>();
  @Output() updateCategoryPlacement = new EventEmitter<CategoryModel[]>();

  router = inject(Router);
  menuService = inject(MenuService);
  sidenavService = inject(SidenavService);

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    if (event.previousIndex !== event.currentIndex) {
      this.updateCategoryPlacement.emit(this.categories);
    }
  }

  navigateToCategory(category: CategoryModel) {
    this.router.navigate(['category', category._id]);
  }

  deleteCategory(deletedCategory: CategoryModel) {
    this.menuService
      .deleteCategory(deletedCategory._id)
      .pipe(
        catchError((err) => {
          throw err;
        }),
      )
      .subscribe((res) => {
        this.categories = this.categories.filter((prod) => prod._id !== deletedCategory._id);
        // this.updateCategoriesList.emit();
        this.updateCategoryPlacement.emit(this.categories);
        this.sidenavService.updateCategories();
      });
  }
}
