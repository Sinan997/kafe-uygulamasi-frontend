import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import { ProductModel } from '../../models/product.model';
import { MenuService } from '../../services';
// import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-products-table',
  standalone: true,
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
  imports: [
    CurrencyPipe,
    CdkDropList,
    CdkDrag,
    FormsModule,
    TranslateModule,
    NgClass,
    // EditProductComponent
  ],
})
export class ProductsTableComponent {
  @Input() products: ProductModel[];
  @Output() updateProductsPlacement = new EventEmitter<ProductModel[]>();
  @Output() updateList = new EventEmitter<boolean>();
  menuService = inject(MenuService);

  isEditing = false;
  visibleEditProductDialog = false;
  product: ProductModel;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
    if (event.previousIndex !== event.currentIndex) {
      this.updateProductsPlacement.emit(this.products);
    }
  }

  deleteProduct(product: ProductModel) {
    // this.menuService
    //   .deleteProduct(product._id)
    //   .pipe(
    //     catchError((err) => {
    //       throw err;
    //     }),
    //   )
    //   .subscribe((res) => {
    //     this.products = this.products.filter((prod) => prod._id !== product._id);
    //     this.updateProductsPlacement.emit(this.products);
    //   });
  }

  openEditProductModal(product: ProductModel) {
    this.visibleEditProductDialog = true;
    this.product = product;
  }
}
