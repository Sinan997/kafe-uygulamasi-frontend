import { Component, EventEmitter, Input, OnInit, Output, inject, input, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModel } from '../../models/table.model';
import { DialogModule } from 'primeng/dialog';
import { TableService } from '../../services/table.service';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrderModel } from '../../models/order.model';
import { finalize, tap } from 'rxjs';
import { CustomMessageService } from 'theme-shared';


@Component({
  selector: 'app-table-details-modal',
  templateUrl: 'table-details.component.html',
  styleUrl: 'table-details.component.scss',
  standalone: true,
  imports: [TranslateModule, DialogModule, ReactiveFormsModule]
})

export class TableDetailsComponent implements OnInit {
  protected readonly service = inject(TableService);
  protected readonly fb = inject(FormBuilder);
  protected readonly customMessageService = inject(CustomMessageService);
  table = input.required<TableModel>();
  @Input() visibleDetailsDialog = true;
  @Output() visibleDetailsDialogChange = new EventEmitter<boolean>();


  orders = signal<OrderModel[]>([]);
  addedOrders = signal<{ _id: string; name: string, price: number, amount: number; }[]>([]);
  form: FormGroup;

  get ordersControls() {
    return (this.form.get('orders') as FormArray).controls;
  }

  get totalPrice() {
    return this.addedOrders().reduce((acc, cur) => {
      return acc + (cur.price * cur.amount);
    }, 0);
  }

  ngOnInit() {
    // console.log(this.table()._id);
    this.service.getTableOrders('65d9e2e6136a0547aaf2264f').subscribe((res) => {
      this.orders.set(res.orders);
      this.buildForm(res.orders);
    });
  }

  maxAmount(order: AbstractControl) {
    return this.orders().find((o) => o.product._id === order.get('_id')!.value)!.amount;
  }

  buildForm(orders: OrderModel[]) {
    this.form = this.fb.group({
      orders: this.fb.array([])
    });

    orders.forEach(order => {
      (this.form.get('orders') as FormArray).push(this.fb.group({
        _id: this.fb.control(order.product._id),
        name: this.fb.control(order.product.name),
        price: this.fb.control(order.product.price),
        amount: this.fb.control(0)
      }));
    });
  }

  hideDialog() {
    this.visibleDetailsDialog = false;
    this.visibleDetailsDialogChange.emit(false);
  }

  onSubmit() {

  }

  increase(order: AbstractControl) {
    const amount = this.orders().find((o) => o.product._id === order.get('_id')!.value)!.amount;
    const orderAmount = order.get('amount')!.value;

    if (amount === order.get('amount')!.value) {
      return;
    }
    order.get('amount')!.setValue(orderAmount + 1);

    this.updateAddedOrders(true, order);
  }

  decrease(order: AbstractControl) {
    if (order.get('amount')!.value > 0) {
      order.get('amount')!.setValue(order.get('amount')!.value - 1);
    }

    this.updateAddedOrders(false, order);
  }

  takeOrder() {
    // add orders to backend;
    if (this.addedOrders().length === 0) {
      return;
    }
    console.log(this.addedOrders());
    // after succesfull event;
    this.service.takeOrders(this.table()._id, this.addedOrders()).pipe(tap((res) => {
      this.addedOrders().forEach((addedOrder) => {
        this.ordersControls.forEach((order, index) => {
          if (order.get('_id')!.value === addedOrder._id) {
            const orderControllerAmount = order.get('amount')!.value;
            const maxAmount = this.maxAmount(order);
            order.get('amount')!.setValue(0);
            
            if (orderControllerAmount === maxAmount) {
              this.ordersControls.splice(index, 1);
              this.orders.update((orders) => {
                return orders.filter((o) => o.product._id !== order.get('_id')!.value);
              });
            }
  
            this.orders.update((orders) => {
              return orders.map((o) => {
                if(o.product._id === order.get('_id')!.value) {
                  o.amount -= orderControllerAmount;
                }
                return o
              })
            });
          }
        });
      });
      this.customMessageService.success(res)
    }), finalize(() => {
      this.addedOrders.update(() => []);
    })).subscribe();

  }

  private updateAddedOrders(add: boolean, order: AbstractControl) {
    this.addedOrders.update((orders) => {
      const isExist = orders.find((o) => o._id === order.get('_id')!.value);

      const maxAmount = this.maxAmount(order);

      if (isExist?.amount === maxAmount && add) {
        order.get('amount')!.setValue(maxAmount);
        return [...orders];
      }

      if (isExist) {
        isExist.amount = add ? isExist.amount + 1 : isExist.amount - 1;

        if (isExist.amount === 0) {
          return orders.filter((o) => o._id !== order.get('_id')!.value);
        }

        return [...orders];
      }

      return [...orders, order.value];
    });
  }

  addAll() {
    this.ordersControls.forEach(order => {
      order.get('amount')!.setValue(this.maxAmount(order));
      this.updateAddedOrders(true, order);
    });
  }

  removeOrderFromAdded(orderId: string){
    this.addedOrders.update(orders => orders.filter(o => o._id !== orderId));
    this.ordersControls.forEach(order => {
      if(order.get('_id')!.value === orderId){
        order.get('amount')!.setValue(0);
      }
    });
  }
}