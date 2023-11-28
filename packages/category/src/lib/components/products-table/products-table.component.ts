import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { catchError } from 'rxjs';
import { productModel } from 'src/app/models/product-model';
import { CategoryService } from '../../services/category.service';
import { EditProductComponent } from '../edit-product/edit-product.component';

@Component({
  selector: 'app-products-table',
  standalone: true,
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
  imports: [CurrencyPipe, NgClass, CdkDropList, CdkDrag, FormsModule, EditProductComponent],
})
export class ProductsTableComponent {
  @Input() products: productModel[];
  @Output() updateProductsPlacement = new EventEmitter<productModel[]>();
  @Output() updateList = new EventEmitter<boolean>();
  categoryService = inject(CategoryService);

  isEditing = false;
  visibleEditProductDialog = false;
  product: productModel;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
    if (event.previousIndex !== event.currentIndex) {
      this.updateProductsPlacement.emit(this.products);
    }
  }

  deleteProduct(product: productModel) {
    this.categoryService
      .deleteProduct(product._id)
      .pipe(
        catchError((err) => {
          throw err;
        }),
      )
      .subscribe((res) => {
        this.products = this.products.filter((prod) => prod._id !== product._id);
        this.updateProductsPlacement.emit(this.products);
      });
  }

  openEditProductModal(product: productModel) {
    this.visibleEditProductDialog = true;
    this.product = product;
  }
}
