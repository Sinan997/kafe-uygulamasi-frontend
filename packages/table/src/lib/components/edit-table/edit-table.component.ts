import { Component, inject, input, model, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { DialogModule } from 'primeng/dialog';
import { CustomMessageService } from 'theme-shared';
import { TableModel } from '../../models/table.model';
import { checkTableName } from '../../utils/name-checker';
import { TableService } from '../../services/table.service';

@Component({
  selector: 'app-edit-table-modal',
  templateUrl: 'edit-table.component.html',
  standalone: true,
  imports: [TranslateModule, DialogModule, ReactiveFormsModule, NgxValidateCoreModule],
})
export class EditTableComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly customMessageService = inject(CustomMessageService);
  protected readonly service = inject(TableService);

  readonly table = input.required<TableModel>();
  readonly visibleEditTableDialog = model.required<boolean>();
  readonly updateList = output();

  form = this.fb.group({
    name: this.fb.control('', [Validators.required]),
  });

  ngOnInit() {
    this.form.controls.name.setValue(this.table().name);
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    if (!checkTableName(this.form.controls.name.value!)) {
      return this.customMessageService.error('table.invalidTableNamePattern');
    }

    this.service
      .updateTable(this.table()._id, this.form.controls.name.value!)
      .pipe(
        tap((res) => {
          this.visibleEditTableDialog.set(false);
          this.updateList.emit();
          this.customMessageService.success(res);
        }),
      )
      .subscribe();
  }
}
