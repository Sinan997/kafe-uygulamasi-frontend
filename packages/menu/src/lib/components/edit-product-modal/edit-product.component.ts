import { Component, EventEmitter, Input, Output, inject, input, model, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { tap } from 'rxjs';
import { DialogModule } from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';
import { CustomMessageService } from 'theme-shared';
import { ProductModel } from '../../models/product.model';
import { MenuService } from '../../services';
import { UpdateProductModel } from '../../models/update-product.model';

@Component({
  selector: 'app-edit-product-modal',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, DialogModule, AutoFocusDirective, TrackEnterKeyDirective, TranslateModule, NgxValidateCoreModule],
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly menuService = inject(MenuService);
  protected readonly customMessageService = inject(CustomMessageService);

  readonly product = input.required<ProductModel>();
  readonly categoryId = input.required<string>();
  readonly visibleEditProductDialog = model.required<boolean>();
  readonly updateList = output();

  form = this.fb.group({
    _id: '',
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    isAvailable: [true, Validators.required],
  });

  ngOnInit(): void {
    this.form.patchValue({
      _id: this.product()._id,
      name: this.product().name,
      price: this.product().price,
      isAvailable: this.product().isAvailable,
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.menuService
      .updateProduct({ ...this.form.value, categoryId: this.categoryId() } as UpdateProductModel)
      .pipe(
        tap((res) => {
          this.visibleEditProductDialog.set(false);
          this.updateList.emit();
          this.customMessageService.success(res);
        }),
      )
      .subscribe();
  }
}
