import { Component, inject, input, output } from '@angular/core';
import { Router } from '@angular/router';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { tap } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CustomMessageService } from 'theme-shared';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { CategoryModel } from '../../models/category.model';
import { MenuService } from '../../services/menu.service';

@Component({
  selector: 'app-menu-categories-table',
  standalone: true,
  templateUrl: './categories-table.component.html',
  styleUrl: './categories-table.component.scss',
  imports: [CdkDropList, CdkDrag, TranslateModule, ConfirmDialogModule],
  providers: [ConfirmationService],
})
export class CategoriesTableComponent {
  protected readonly router = inject(Router);
  protected readonly menuService = inject(MenuService);
  protected readonly customMessageService = inject(CustomMessageService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly translateService = inject(TranslateService);

  readonly categories = input.required<CategoryModel[]>();
  readonly updateCategoriesList = output();
  readonly updateCategoryPlacement = output<CategoryModel[]>();

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousIndex === event.currentIndex) {
      return;
    }

    moveItemInArray(this.categories(), event.previousIndex, event.currentIndex);
    this.updateCategoryPlacement.emit(this.categories());
  }

  deleteCategory(deletedCategory: CategoryModel) {
    this.confirmationService.confirm({
      message: this.translateService.instant('menu.deleteCategoryMessage', {
        name: deletedCategory.name,
      }),
      icon: 'fa-solid fa-triangle-exclamation',
      accept: () => {
        this.menuService
          .deleteCategory(deletedCategory._id)
          .pipe(
            tap((res) => {
              this.updateCategoriesList.emit();
              this.customMessageService.success(res);
            }),
          )
          .subscribe();
      },
    });
  }

  navigateToCategory(category: CategoryModel) {
    this.router.navigate(['menu', 'category', category._id], { queryParams: { name: category.name } });
  }
}
