import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
// import { CategoryService } from '../../services/category.service';
// import { AddProductModel } from '../../models/add-product.model';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';
import { MenuService } from '../../services';
import { CustomMessageService } from 'theme-shared';
import { tap } from 'rxjs';
import { AddProductModel } from '../../models/add-product.model';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-new-product-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    AutoFocusDirective,
    TrackEnterKeyDirective,
    NgxValidateCoreModule,
    TranslateModule,
  ],
  templateUrl: './new-product.component.html',
})
export class NewProductComponent {
  @Input() categoryId: string;
  @Input() visibleNewProductDialog = true;
  @Output() visibleNewProductDialogChange = new EventEmitter<boolean>();
  @Output() updateProductsList = new EventEmitter<boolean>();

  fb = inject(FormBuilder);
  customMessageService = inject(CustomMessageService);
  menuService = inject(MenuService);

  form = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    isAvailable: [true, Validators.required],
  });

  hideDialog() {
    this.visibleNewProductDialog = false;
    this.visibleNewProductDialogChange.emit(false);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.menuService
      .addProduct({ categoryId: this.categoryId, ...this.form.value } as AddProductModel)
      .pipe(
        tap((res) => {
          this.hideDialog();
          this.updateProductsList.emit();
          this.customMessageService.success(res);
        }),
      )
      .subscribe();
  }
}
