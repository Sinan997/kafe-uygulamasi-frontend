import { Component, ElementRef, EventEmitter, Output, ViewChild, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TableService } from '../../services/table.service';
import { CustomMessageService } from 'theme-shared';
import { finalize, tap } from 'rxjs';
import { checkTableName } from '../../utils/name-checker';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-table',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: 'new-table.component.html'
})

export class NewTableComponent {
  protected readonly service = inject(TableService);
  protected readonly customMessageService = inject(CustomMessageService);

  @Output() updateList = new EventEmitter();
  @ViewChild('myInput') myInput: ElementRef;
  name: string;
  isEditing = signal(false);

  editButton() {
    this.isEditing.set(true);
    this.myInput.nativeElement.focus();
  }

  abortNewTableName() {
    this.isEditing.set(false);
    this.name = '';
  }

  onSubmit() {
    // TODO: Add validation for name input field and show error message if it's not like Table 1, Table 2, etc.
    if(!checkTableName(this.name)) {
      this.customMessageService.error('table.invalidTableNamePattern');
      return;
    }

    this.isEditing.set(false);
    this.myInput.nativeElement.blur();
    if (this.name === '') {
      return;
    }

    this.service
      .addTable(this.name)
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
          this.updateList.emit();
        }),
        finalize(() => this.name = '')
      )
      .subscribe();
  }
}