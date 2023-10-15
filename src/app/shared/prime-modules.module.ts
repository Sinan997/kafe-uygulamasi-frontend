import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { MessagesModule } from 'primeng/messages';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { OrderListModule } from 'primeng/orderlist';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { SkeletonModule } from 'primeng/skeleton';
import { InputSwitchModule } from 'primeng/inputswitch';

@NgModule({
  exports: [
    InputTextModule,
    ProgressSpinnerModule,
    InputSwitchModule,
    SkeletonModule,
    OrderListModule,
    SelectButtonModule,
    ConfirmPopupModule,
    ButtonModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    TagModule,
    MessagesModule,
    ConfirmDialogModule,
    RadioButtonModule,
    StyleClassModule,
    DropdownModule,
  ],
})
export class PrimeModules {}
