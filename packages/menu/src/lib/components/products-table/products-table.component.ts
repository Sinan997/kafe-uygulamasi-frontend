import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductModel } from '../../models/product.model';
import { MenuService } from '../../services';
import { tap } from 'rxjs';
import { EditProductComponent } from '../edit-product-modal/edit-product.component';
import { CustomMessageService } from 'theme-shared';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog'

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
    EditProductComponent,
    ConfirmDialogModule
  ],
  providers:[ConfirmationService]
})
export class ProductsTableComponent {
  @Input() products: ProductModel[];
  @Output() updateProductsPlacement = new EventEmitter<ProductModel[]>();
  @Output() updateList = new EventEmitter<boolean>();
  protected readonly menuService = inject(MenuService);
  protected readonly customMessageService = inject(CustomMessageService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly translateService = inject(TranslateService);

  visibleEditProductDialog = false;
  product: ProductModel;

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
    if (event.previousIndex !== event.currentIndex) {
      this.updateProductsPlacement.emit(this.products);
    }
  }

  deleteProduct(product: ProductModel) {
    this.confirmationService.confirm({
      message: this.translateService.instant('menu.deleteProductMessage', {
        name: product.name,
      }),
      header: this.translateService.instant('menu.deleteProductHeader'),
      accept: () => {
        this.menuService
        .deleteProduct(product._id)
        .pipe(
          tap((res) => {
            this.customMessageService.success(res);
            this.updateList.emit(true);
          }),
        )
        .subscribe();
      },
    });
  }


  openEditProductModal(product: ProductModel) {
    this.visibleEditProductDialog = true;
    this.product = product;
  }
}
