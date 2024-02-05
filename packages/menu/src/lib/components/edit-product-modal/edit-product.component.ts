import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { tap } from 'rxjs';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';
import { ProductModel } from '../../models/product.model';
import { MenuService } from '../../services';
import { UpdateProductModel } from '../../models/update-product.model';
import { CustomMessageService } from 'theme-shared';
import { TranslateModule } from '@ngx-translate/core';
import { NgxValidateCoreModule } from '@ngx-validate/core';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [
    NgClass,
    ReactiveFormsModule,
    DialogModule,
    AutoFocusDirective,
    TrackEnterKeyDirective,
    TranslateModule,
    NgxValidateCoreModule
  ],
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent {
  @Input() product: ProductModel;
  @Input() visibleEditProductDialog = true;
  @Output() visibleEditProductDialogChange = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();
  fb = inject(FormBuilder);
  menuService = inject(MenuService);
  customMessageService = inject(CustomMessageService);

  form = this.fb.group({
    _id: '',
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    isAvailable: [true, Validators.required],
  });

  ngOnInit(): void {
    this.form.patchValue({
      _id: this.product._id,
      name: this.product.name,
      price: this.product.price,
      isAvailable: this.product.isAvailable,
    });
  }

  hideDialog() {
    this.visibleEditProductDialog = false;
    this.visibleEditProductDialogChange.emit(false);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.menuService
      .updateProduct({ ...this.form.value } as UpdateProductModel)
      .pipe(
        tap((res) => {
          this.hideDialog();
          this.updateList.emit();
          this.customMessageService.success(res);
        }),
      )
      .subscribe();
  }
}
