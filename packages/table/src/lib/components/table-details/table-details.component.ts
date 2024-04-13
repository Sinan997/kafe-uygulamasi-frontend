import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  inject,
  input,
  signal,
} from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableModel } from '../../models/table.model';
import { DialogModule } from 'primeng/dialog';
import { TableService } from '../../services/table.service';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomMessageService } from 'theme-shared';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { OrderModel } from 'orders';
import { FormOrderModel } from '../../models/form-order.model';
import { finalize, tap } from 'rxjs';

@Component({
  selector: 'app-table-details-modal',
  templateUrl: 'table-details.component.html',
  styleUrl: 'table-details.component.scss',
  standalone: true,
  imports: [TranslateModule, DialogModule, ReactiveFormsModule, ConfirmDialogModule],
  providers: [ConfirmationService],
})
export class TableDetailsComponent implements OnInit {
  protected readonly service = inject(TableService);
  protected readonly fb = inject(FormBuilder);
  protected readonly customMessageService = inject(CustomMessageService);
  protected readonly confirmationService = inject(ConfirmationService);
  protected readonly translateService = inject(TranslateService);
  table = input.required<TableModel>();
  @Input() visibleDetailsDialog = true;
  @Output() visibleDetailsDialogChange = new EventEmitter<boolean>();

  takeOrderButtonLoading = signal<boolean>(false);

  orders = signal<FormOrderModel[]>([]);
  allOrders = signal<FormOrderModel[]>([]);

  get totalPrice() {
    return this.orders().reduce((acc, cur) => {
      return acc + cur.productId.price * cur.pickedAmount;
    }, 0);
  }

  ngOnInit() {
    this.service.getTableOrders(this.table()._id).subscribe((res) => {
      this.sumSameOrdersAndSetOrders(res.orders);
    });
  }

  sumSameOrdersAndSetOrders(orders: OrderModel[]) {
    let manipulatedOrders: FormOrderModel[] = [];
    orders.forEach((order) => {
      const index = manipulatedOrders.findIndex((o) => o.productId._id === order.productId._id);
      if (index !== -1) {
        manipulatedOrders[index].amount += order.amount;
      } else {
        manipulatedOrders.push({ ...order, pickedAmount: 0 });
      }
    });

    this.orders.set(manipulatedOrders);
    this.allOrders.set(orders.map((order) => ({ ...order, pickedAmount: 0 })));
  }

  hideDialog() {
    this.visibleDetailsDialog = false;
    this.visibleDetailsDialogChange.emit(false);
  }

  increase(order: FormOrderModel) {
    if (order.pickedAmount === order.amount) {
      return;
    }
    this.orders.update((orders) => {
      return orders.map((o) => {
        if (o.productId._id === order.productId._id) {
          o.pickedAmount += 1;
        }
        return o;
      });
    });
  }

  decrease(order: FormOrderModel) {
    if (order.pickedAmount === 0) {
      return;
    }
    this.orders.update((orders) => {
      return orders.map((o) => {
        if (o.productId._id === order.productId._id) {
          o.pickedAmount -= 1;
        }
        return o;
      });
    });
  }

  resetPickedAmount(order: FormOrderModel) {
    order.pickedAmount = 0;
  }

  takeOrder() {
    if (this.orders().every((order) => order.pickedAmount === 0)) {
      this.customMessageService.error('error.NO_ORDER_SELECTED');
      return;
    }
    this.takeOrderButtonLoading.set(true);

    const orders: FormOrderModel[] = [];

    this.orders().forEach((order) => {
      let pickedAmount = order.pickedAmount;
      if (order.pickedAmount === 0) return;

      while (pickedAmount > 0) {
        const findedOrder = this.allOrders().find(
          (o) => o.productId._id === order.productId._id && o.pickedAmount !== o.amount,
        );
        if (!findedOrder) break;
        if (pickedAmount > findedOrder.amount) {
          findedOrder.pickedAmount = findedOrder.amount;
          pickedAmount -= findedOrder.amount;
        } else {
          findedOrder.pickedAmount = pickedAmount;
          pickedAmount = 0;
        }
        orders.push(findedOrder);
      }
    });

    this.service
      .takeOrders(this.table()._id, orders)
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
          this.sumSameOrdersAndSetOrders(res.orders);
        }),
        finalize(() => {
          this.takeOrderButtonLoading.set(false);
        }),
      )
      .subscribe();
  }

  addAll() {
    this.orders.update((orders) => {
      return orders.map((order) => {
        order.pickedAmount = order.amount;
        return order;
      });
    });
  }

  deleteOrder(order: FormOrderModel) {
    this.confirmationService.confirm({
      message: this.translateService.instant('table.deleteTableMessage', {
        name: this.table().name,
      }),
      header: this.translateService.instant('table.deleteTableHeader'),
      accept: () => {
        const orderIds = this.allOrders()
          .filter((o) => o.productId._id === order.productId._id)
          .map((o) => o._id);

        this.service
          .deleteOrder(orderIds, this.table()._id)
          .pipe(
            tap((res) => {
              this.orders.update((orders) => {
                return orders.filter((o) => o._id !== order._id);
              });
              this.allOrders.update((orders) => {
                return orders.filter((o) => o.productId._id !== order.productId._id);
              });
              this.customMessageService.success(res);
            }),
          )
          .subscribe();
      },
    });
  }
}
