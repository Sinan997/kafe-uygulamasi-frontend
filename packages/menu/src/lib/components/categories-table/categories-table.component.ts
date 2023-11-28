import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { catchError, finalize } from 'rxjs';
import { SidenavService } from 'theme-shared';
import { categoryModel } from '../../models/category';
import { MenuService } from '../../services/menu.service';

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
    this.router.navigate(['category', category._id]);
  }

  deleteCategory(deletedCategory: categoryModel) {
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

  // deleteProduct(product: productModel) {
  //   this.categoryService
  //     .deleteProduct(product._id)
  //     .pipe(
  //       catchError((err) => {
  //         throw err;
  //       }),
  //     )
  //     .subscribe((res) => {
  //       this.categories = this.products.filter((prod) => prod._id !== product._id);
  //       this.updateProductsPlacement.emit(this.products);
  //     });
  // }
}
