import { Component, ElementRef, HostListener, inject, output, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TableService } from '../../services/table.service';
import { CustomMessageService } from 'theme-shared';
import { finalize, tap } from 'rxjs';
import { checkTableName } from '../../utils/name-checker';

@Component({
  selector: 'app-add-table',
  standalone: true,
  imports: [FormsModule, TranslateModule],
  templateUrl: 'new-table.component.html',
  styleUrl: 'new-table.component.scss',
})
export class NewTableComponent {
  protected readonly service = inject(TableService);
  protected readonly customMessageService = inject(CustomMessageService);

  readonly updateList = output();
  readonly myInput = viewChild<ElementRef>('myInput');
  name = signal<string>('');
  isEditing = signal(false);

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    this.isEditing.set(false);
    this.myInput()?.nativeElement.blur();
  }

  editButton() {
    this.isEditing.set(true);
    this.myInput()?.nativeElement.focus();
  }

  abortNewTableName() {
    this.isEditing.set(false);
    this.name.set('');
  }

  onSubmit() {
    if (!checkTableName(this.name())) {
      return this.customMessageService.error('table.invalidTableNamePattern');
    }

    this.service
      .addTable(this.name())
      .pipe(
        tap((res) => {
          this.customMessageService.success(res);
          this.updateList.emit();
          this.isEditing.set(false);
          this.myInput()?.nativeElement.blur();
        }),
        finalize(() => this.name.set('')),
      )
      .subscribe();
  }
}
