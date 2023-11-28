import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { productModel } from 'src/app/models/product-model';
import { CategoryService } from '../../services/category.service';
import { UpdateProductModel } from '../../models/update-product.model';
import { catchError, finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule, DialogModule],
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent {
  @Input() product: productModel;
  @Input() visibleEditProductDialog = true;
  @Output() visibleEditProductDialogChange = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();
  fb = inject(FormBuilder);
  categoryService = inject(CategoryService);
  messageService = inject(MessageService);
  isSubmitted = signal(false);

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
    this.visibleEditProductDialog = false;
    this.visibleEditProductDialogChange.emit(false);
  }

  onSubmit() {
    this.isSubmitted.set(true);
    if (this.form.invalid) {
      return;
    }
    this.categoryService
      .updateProduct({ ...this.form.value } as UpdateProductModel)
      .pipe(
        finalize(() => {
          this.isSubmitted.set(false);
          this.visibleEditProductDialog = false;
          this.visibleEditProductDialogChange.emit(false);
        }),
        catchError((err) => {
          throw err;
        }),
      )
      .subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Başarılı',
          detail: res.message,
        });

        this.updateList.emit();
      });
  }
}
