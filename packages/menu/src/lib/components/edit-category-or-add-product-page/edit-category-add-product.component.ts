import { Component, DestroyRef, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService } from '../../services';
import { ProductToolbarComponent } from '../toolbar/product-toolbar.component';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { NewProductComponent } from '../new-product/new-product.component';
import { ProductsTableComponent } from '../products-table/products-table.component';
import { ProductModel } from '../../models/product.model';
import { tap } from 'rxjs';
import { CustomMessageService } from 'theme-shared';

@Component({
  selector: 'app-category',
  templateUrl: './edit-category-add-product.component.html',
  styleUrl: './edit-category-add-product.component.scss',
  standalone: true,
  imports: [
    ProductToolbarComponent,
    ProductsTableComponent,
    NewProductComponent,
    UpdateCategoryComponent,
  ],
})
export class EditCategoryOrAddProductComponent {
  router = inject(Router);
  destroyRef = inject(DestroyRef);
  menuService = inject(MenuService);
  customMessageService = inject(CustomMessageService);

  visibleNewProductDialog = false;
  categoryId: string;
  products: ProductModel[] = [];

  ngOnInit(): void {
    this.categoryId = this.router.url.split('/')[3];
    this.get();
  }

  get() {
    this.menuService.getAllProducts(this.categoryId).subscribe((res) => {
      this.products = res.products;
      this.sortCategoriesByIndexLocally();
    });
  }

  sortCategoriesByIndexLocally() {
    this.products = this.products.sort((a, b) => a.index - b.index);
  }

  openNewProductDialog() {
    this.visibleNewProductDialog = true;
  }

  updateProductsPlacement(products: ProductModel[]) {
    this.products = products;
    this.setIndexToProducts();
    this.setProductPlacement();
  }

  setIndexToProducts() {
    this.products = this.products.map((product, index) => {
      product.index = index;
      return product;
    });
  }

  setProductPlacement() {
    this.menuService
      .setProductsIndex(this.products)
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
        }),
      )
      .subscribe();
  }
}
