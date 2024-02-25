import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog';
import { TableService } from '../../services/table.service';
import { CategoryModel, MenuService } from 'menu';
import { tap } from 'rxjs';
import { InputNumberModule } from 'primeng/inputnumber';
import { NgClass } from '@angular/common';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-new-order-modal',
  templateUrl: 'new-order.component.html',
  styleUrls: ['new-order.component.scss'],
  standalone: true,
  imports: [TranslateModule, DialogModule, InputNumberModule, ReactiveFormsModule, ConfirmDialogModule, NgClass]
})

export class NewOrderComponent implements OnInit {
  protected readonly fb = inject(FormBuilder);
  protected readonly service = inject(TableService);
  protected readonly menuService = inject(MenuService);
  protected readonly confirmationService = inject(ConfirmationService);
  selectedCategory: CategoryModel | null = null;
  categories: CategoryModel[];
  @Input() tableId: string;
  @Input() visibleNewOrderDialog = true;
  @Output() visibleNewOrderDialogChange = new EventEmitter<boolean>();

  form: FormGroup;

  ngOnInit() {
    this.menuService.getCategories().pipe(tap((res) => {
      this.categories = res.categories;
    })).subscribe();
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
      products: this.fb.array([])
    });
    category.products.forEach(product => {
      (this.form.get('products') as FormArray).push(this.fb.group({
        _id: this.fb.control(product._id),
        name: this.fb.control(product.name),
        price: this.fb.control(product.price),
        isAvailable: this.fb.control(product.isAvailable),
        amount: this.fb.control(0)
      }));
    });
  }

  get products() {
    return (this.form.get('products') as FormArray).controls;
  }


  backToCategories() {
    this.selectedCategory = null;
    this.form = this.fb.group({
      products: this.fb.array([])
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
    if(this.products.find(product => product.get('amount')!.value > 0)){
      // this.confirmationService.confirm({
      //   closeOnEscape: true,
      //   icon: 'fa-solid fa-check',
      //   message: 'Are you sure that you want to submit the order?',
      //   accept: () => {
      //     console.log('accepted');
      //   }
      // });
      this.confirmationService.confirm({
        header: 'Confirmation',
        acceptIcon: 'pi pi-check mr-2',
        rejectIcon: 'pi pi-times mr-2',
        rejectButtonStyleClass: 'p-button-sm',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
            // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
            // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
    }
  }
}