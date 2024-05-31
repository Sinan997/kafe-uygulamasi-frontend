import { Component, OnInit, inject, input, model, signal } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { tap } from 'rxjs';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CategoryModel, MenuService } from 'menu';
import { CustomMessageService } from 'theme-shared';
import { TableService } from '../../services/table.service';
import { TableModel } from '../../models/table.model';

@Component({
  selector: 'app-new-order-modal',
  templateUrl: 'new-order.component.html',
  styleUrls: ['new-order.component.scss'],
  standalone: true,
  imports: [TranslateModule, DialogModule, ReactiveFormsModule, ConfirmDialogModule, NgClass],
  providers: [ConfirmationService],
})
export class NewOrderComponent implements OnInit {
  protected readonly fb = inject(FormBuilder);
  protected readonly service = inject(TableService);
  protected readonly menuService = inject(MenuService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly translateService = inject(TranslateService);
  protected readonly customMessageService = inject(CustomMessageService);

  readonly table = input.required<TableModel>();
  readonly visibleNewOrderDialog = model.required<boolean>();

  selectedCategory = signal<CategoryModel | null>(null);
  categories = signal<CategoryModel[]>([]);

  form = this.fb.group({
    products: this.fb.array([]),
  });

  ngOnInit() {
    this.menuService
      .getCategoriesWithProducts()
      .pipe(
        tap((res) => {
          this.categories.set(res.categories.sort((a, b) => a.index - b.index));
        }),
      )
      .subscribe();
  }

  selectCategory(category: CategoryModel) {
    this.selectedCategory.set((category?.products.sort((a, b) => a.index - b.index), category));
    this.buildForm(category);
  }

  buildForm(category: CategoryModel) {
    category.products.forEach((product) => {
      (this.form.get('products') as FormArray).push(
        this.fb.group({
          _id: this.fb.control(product._id),
          name: this.fb.control(product.name),
          price: this.fb.control(product.price),
          isAvailable: this.fb.control(product.isAvailable),
          amount: this.fb.control(0),
        }),
      );
    });
  }

  get products() {
    return (this.form.get('products') as FormArray).controls;
  }

  backToCategories() {
    this.selectedCategory.set(null);
    this.form = this.fb.group({
      products: this.fb.array([]),
    });
  }

  resetForm() {
    this.products.forEach((product) => product.get('amount')!.setValue(0));
  }

  increase(product: AbstractControl) {
    product.get('amount')!.setValue(product.get('amount')!.value + 1);
  }

  decrease(product: AbstractControl) {
    if (product.get('amount')!.value > 0) {
      product.get('amount')!.setValue(product.get('amount')!.value - 1);
    }
  }

  onSubmit() {
    if (this.products.find((product) => product.get('amount')!.value > 0)) {
      this.confirmationService.confirm({
        accept: () => {
          const orders = this.products.map((product) => product.value).filter((product) => product.amount > 0);
          this.service
            .addOrder(orders, this.table()._id)
            .pipe(
              tap((res) => {
                this.customMessageService.success(res);
                this.resetForm();
              }),
            )
            .subscribe();
        },
        reject: () => {
          this.resetForm();
        },
      });
    }
  }
}
