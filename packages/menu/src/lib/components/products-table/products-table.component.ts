import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyPipe, NgClass } from '@angular/common';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductModel } from '../../models/product.model';
import { MenuService } from '../../services';
import { tap } from 'rxjs';
import { EditProductComponent } from '../edit-product-modal/edit-product.component';
import { CustomMessageService } from 'theme-shared';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-products-table',
  standalone: true,
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.scss',
  imports: [CurrencyPipe, CdkDropList, CdkDrag, FormsModule, TranslateModule, NgClass, EditProductComponent, ConfirmDialogModule],
  providers: [ConfirmationService],
})
export class ProductsTableComponent {
  protected readonly menuService = inject(MenuService);
  protected readonly customMessageService = inject(CustomMessageService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly translateService = inject(TranslateService);

  readonly products = input.required<ProductModel[]>();
  readonly categoryId = input.required<string>();
  readonly updateProductsPlacement = output<ProductModel[]>();
  readonly updateList = output();

  visibleEditProductDialog = signal(false);
  selectedProduct = signal<ProductModel>({} as ProductModel);

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products(), event.previousIndex, event.currentIndex);
    if (event.previousIndex !== event.currentIndex) {
      this.updateProductsPlacement.emit(this.products());
    }
  }

  deleteProduct(product: ProductModel) {
    this.confirmationService.confirm({
      message: this.translateService.instant('menu.deleteProductMessage', {
        name: product.name,
      }),
      icon: 'fa-solid fa-triangle-exclamation',
      accept: () => {
        this.menuService
          .deleteProduct(product._id)
          .pipe(
            tap((res) => {
              this.customMessageService.success(res);
              this.updateList.emit();
            }),
          )
          .subscribe();
      },
    });
  }

  openEditProductModal(product: ProductModel) {
    this.visibleEditProductDialog.set(true);
    this.selectedProduct.set(product);
  }
}
