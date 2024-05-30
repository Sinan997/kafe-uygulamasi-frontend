import { Component, EventEmitter, Input, Output, inject, input, model, output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { TranslateModule } from '@ngx-translate/core';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';
import { CustomMessageService } from 'theme-shared';
import { MenuService } from '../../services';
import { AddProductModel } from '../../models/add-product.model';

@Component({
  selector: 'app-new-product-modal',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, AutoFocusDirective, TrackEnterKeyDirective, NgxValidateCoreModule, TranslateModule],
  templateUrl: './new-product.component.html',
})
export class NewProductComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly customMessageService = inject(CustomMessageService);
  protected readonly menuService = inject(MenuService);

  readonly categoryId = input.required<string>();
  readonly visibleNewProductDialog = model(false);
  readonly updateProductsList = output();

  form = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    isAvailable: [true, Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.menuService
      .addProduct({ categoryId: this.categoryId(), ...this.form.value } as AddProductModel)
      .pipe(
        tap((res) => {
          this.visibleNewProductDialog.set(false);
          this.updateProductsList.emit();
          this.customMessageService.success(res);
        }),
      )
      .subscribe();
  }
}
