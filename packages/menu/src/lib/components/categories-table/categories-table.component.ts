import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CustomMessageService } from 'theme-shared';
import { tap } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-categories-table',
  standalone: true,
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss',
  imports: [CdkDropList, CdkDrag, TranslateModule],
})
export class CategoriesTableComponent {
  @Input() categories: CategoryModel[] = [];
  @Output() updateCategoriesList = new EventEmitter<boolean>();
  @Output() updateCategoryPlacement = new EventEmitter<CategoryModel[]>();

  router = inject(Router);
  menuService = inject(MenuService);
  customMessageService = inject(CustomMessageService);

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    if (event.previousIndex !== event.currentIndex) {
      this.updateCategoryPlacement.emit(this.categories);
    }
  }

  navigateToCategory(category: CategoryModel) {
    this.router.navigate(['menu', 'category', category._id]);
  }

  deleteCategory(deletedCategory: CategoryModel) {
    this.menuService
      .deleteCategory(deletedCategory._id)
      .pipe(
        tap((res) => {
          this.updateCategoriesList.emit();
          this.customMessageService.success(res);
        }),
      )
      .subscribe();
  }
}
