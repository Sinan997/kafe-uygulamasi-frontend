import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { TableModel } from '../../models/table.model';
import { TranslateModule } from '@ngx-translate/core';
import { DialogModule } from 'primeng/dialog'; import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { checkTableName } from '../../utils/name-checker';
import { CustomMessageService } from 'theme-shared';
import { TableService } from '../../services/table.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-edit-table-modal',
  templateUrl: 'edit-table.component.html',
  standalone: true,
  imports: [TranslateModule, DialogModule, ReactiveFormsModule, NgxValidateCoreModule]
})

export class EditTableComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly customMessageService = inject(CustomMessageService);
  protected readonly service = inject(TableService);

  // table = input<TableModel>();
  @Input({ required: true }) table: TableModel;
  @Input() visibleEditTableDialog = true;
  @Output() visibleEditTableDialogChange = new EventEmitter<boolean>();
  @Output() updateList = new EventEmitter<boolean>();

  form: FormGroup;

  get name(){
    return this.form.get('name');
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: this.fb.control(this.table.name, [Validators.required]),
    });
  }

  hideDialog() {
    this.visibleEditTableDialog = false;
    this.visibleEditTableDialogChange.emit(false);
  }

  onSubmit() {
    if(!checkTableName(this.name?.value)) {
      this.customMessageService.error('table.invalidTableNamePattern');
      return;
    }

    this.service
    .updateTable(this.table._id, this.name?.value)
    .pipe(
      tap((res) => {
        this.hideDialog();
        this.updateList.emit();
        this.customMessageService.success(res);
      }),
    )
    .subscribe();
  }
}