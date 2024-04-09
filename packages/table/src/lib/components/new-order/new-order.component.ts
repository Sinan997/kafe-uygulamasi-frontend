import { Component, EventEmitter, Input, OnInit, Output, inject, input } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { TableService } from '../../services/table.service';
import { CategoryModel, MenuService } from 'menu';
import { tap } from 'rxjs';
import { NgClass } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModel } from '../../models/table.model';
import { CustomMessageService } from 'theme-shared';

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
  selectedCategory: CategoryModel | null = null;
  categories: CategoryModel[];
  table = input.required<TableModel>();
  @Input() visibleNewOrderDialog = true;
  @Output() visibleNewOrderDialogChange = new EventEmitter<boolean>();

  form: FormGroup;

  ngOnInit() {
    this.menuService
      .getCategories()
      .pipe(
        tap((res) => {
          this.categories = res.categories;
        }),
      )
      .subscribe();
  }

  hideDialog() {
    this.visibleNewOrderDialog = false;
    this.visibleNewOrderDialogChange.emit(false);
  }

  selectCategory(category: CategoryModel) {
    this.selectedCategory = category;
    this.buildForm(category);
  }

  buildForm(category: CategoryModel) {
    this.form = this.fb.group({
      products: this.fb.array([]),
    });
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
    this.selectedCategory = null;
    this.resetForm();
  }

  resetForm() {
    this.selectedCategory = null;
    this.form = this.fb.group({
      products: this.fb.array([]),
    });
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
        header: this.translateService.instant('table.newOrder'),
        accept: () => {
          const orders = this.products
            .map((product) => product.value)
            .filter((product) => product.amount > 0);

          this.service
            .addOrder(orders, this.table()._id)
            .pipe(
              tap((res) => {
                this.customMessageService.success(res);
                this.products.forEach((product) => product.get('amount')!.setValue(0));
                this.resetForm();
              }),
            )
            .subscribe();
        },
        reject: () => {
          this.products.forEach((product) => product.get('amount')!.setValue(0));
        },
      });
    }
  }
}
