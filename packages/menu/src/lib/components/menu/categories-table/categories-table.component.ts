import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { categoryModel } from '../../../models/category';
import { Router } from '@angular/router';
import { MenuService } from '../../../services/menu.service';
import { finalize } from 'rxjs';
import { SidenavService } from 'theme-shared';

@Component({
  selector: 'app-menu-categories-table',
  standalone: true,
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss',
  imports: [CdkDropList, CdkDrag, ProgressSpinnerModule],
})
export class CategoriesTableComponent {
  @Input() categories: categoryModel[] = [];
  @Output() updateCategoriesList = new EventEmitter<boolean>();
  @Output() updateCategoryPlacement = new EventEmitter<categoryModel[]>();

  router = inject(Router);
  menuService = inject(MenuService);
  sidenavService = inject(SidenavService);

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    if (event.previousIndex !== event.currentIndex) {
      this.updateCategoryPlacement.emit(this.categories);
    }
  }

  navigateToCategory(category: categoryModel) {
    this.router.navigate(['menu', 'category', category._id]);
  }

  deleteCategory(deletedCategory: categoryModel) {
    console.log(deletedCategory._id);
    this.menuService
      .deleteCategory(deletedCategory._id)
      .pipe(finalize(() => {}))
      .subscribe((res) => {
        this.updateCategoriesList.emit();
        this.menuService.setCategoriesIndex(this.categories);
        this.sidenavService.updateCategories();
      });
  }
}
