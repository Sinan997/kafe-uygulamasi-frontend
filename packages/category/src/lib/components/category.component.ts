import { Component, DestroyRef, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { ProductModel } from '../models';
import { CategoryToolbarComponent } from './toolbar/toolbar.component';
import { CategoryService } from '../services/category.service';
import { ProductsTableComponent } from './products-table/products-table.component';
import { NewProductComponent } from './new-product/new-product.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  standalone: true,
  imports: [
    CategoryToolbarComponent,
    ProductsTableComponent,
    NewProductComponent,
    UpdateCategoryComponent,
  ],
})
export class CategoryComponent {
  activatedRoute = inject(ActivatedRoute);
  destroyRef = inject(DestroyRef);

  visibleNewProductDialog = false;
  categoryId: string;
  products: ProductModel[] = [];

  constructor(
    private messageService: MessageService,
    private categoryService: CategoryService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((changed) => {
      this.categoryId = changed['id'];
      this.get();
    });
  }

  get() {
    this.categoryService.getAllProducts(this.categoryId).subscribe((res) => {
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
    this.categoryService
      .setProductsIndex(this.products)
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
