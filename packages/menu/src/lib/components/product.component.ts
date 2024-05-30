import { Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MenuService } from '../services';
import { ProductToolbarComponent } from './toolbar/product-toolbar.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { ProductModel } from '../models/product.model';
import { tap } from 'rxjs';
import { CustomMessageService } from 'theme-shared';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
  standalone: true,
  imports: [ProductToolbarComponent, ProductsTableComponent, NewProductComponent, UpdateCategoryComponent],
})
export class ProductComponent {
  protected readonly router = inject(Router);
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly menuService = inject(MenuService);
  protected readonly customMessageService = inject(CustomMessageService);

  visibleNewProductDialog = signal(false);
  categoryId = signal<string>('');
  categoryName = signal<string>('');
  #products = signal<ProductModel[]>([]);
  products = computed(() => this.sortProducts(this.#products()));

  constructor() {
    effect(() => {
      const queryParams: Params = { name: this.categoryName() };

      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      });
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((val) => this.categoryId.set(val['id']));
    this.activatedRoute.queryParams.subscribe((val) => this.categoryName.set(val['name']));
    this.getList();
  }

  getList() {
    this.menuService.getAllProducts(this.categoryId()).subscribe((res) => {
      this.#products.set(res.products);
    });
  }

  updateProductsPlacement(products: ProductModel[]) {
    this.#products.set(products);
    this.setIndexToProducts();
    this.updateProductsIndexHttp();
  }

  setIndexToProducts() {
    this.#products.update((products) =>
      products.map((product, index) => {
        product.index = index;
        return product;
      }),
    );
  }

  updateProductsIndexHttp() {
    this.menuService
      .setProductsIndex(this.products())
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
        }),
      )
      .subscribe();
  }

  sortProducts(products: ProductModel[]) {
    return products.sort((a, b) => a.index - b.index);
  }
}
