import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../services/category.service';
import { AddProductModel } from '../../models/add-product.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-new-product-modal',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, DialogModule],
  templateUrl: './new-product.component.html',
})
export class NewProductComponent {
  @Input() visibleNewProductDialog = true;
  @Input() categoryId: string;
  @Output() visibleNewProductDialogChange = new EventEmitter<boolean>();
  @Output() updateProductsList = new EventEmitter<boolean>();

  fb = inject(FormBuilder);
  categoryService = inject(CategoryService);
  messageService = inject(MessageService);

  isSubmitted = signal(false);
  form = this.fb.group({
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    isAvailable: [true, Validators.required],
  });

  get name() {
    return this.form.controls.name;
  }

  get price() {
    return this.form.controls.price;
  }

  get isAvailable() {
    return this.form.controls.isAvailable;
  }

  hideDialog() {
    this.visibleNewProductDialog = false;
    this.visibleNewProductDialogChange.emit(false);
  }

  onSubmit() {
    this.isSubmitted.set(true);
    if (this.form.invalid) {
      return;
    }
    this.categoryService
      .addProduct({ categoryId: this.categoryId, ...this.form.value } as AddProductModel)
      .pipe(
        finalize(() => {
          this.hideDialog();
          this.updateProductsList.emit();
        }),
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'İşlem Başarısız',
            detail: err.error.message,
          });
          throw err;
        }),
      )
      .subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Kategori Eklendi',
          detail: res.message,
        });
      });
  }
}
