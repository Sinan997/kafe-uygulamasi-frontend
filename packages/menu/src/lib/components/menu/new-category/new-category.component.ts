import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MenuService } from '../../../services/menu.service';
import { catchError, finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { SidenavService } from 'theme-shared';

@Component({
  selector: 'app-new-category-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogModule],
  templateUrl: './new-category.component.html',
})
export class NewCategoryComponent {
  @Input() visibleNewCategoryDialog = true;
  @Output() visibleNewCategoryDialogChange = new EventEmitter<boolean>();
  @Output() updateCategoriesList = new EventEmitter<boolean>();

  fb = inject(FormBuilder);
  menuService = inject(MenuService);
  messageService = inject(MessageService);
  sidenavService = inject(SidenavService);

  isSubmitted = signal(false);
  form = this.fb.group({
    newCategoryName: ['', Validators.required],
  });

  get newCategoryName() {
    return this.form.controls.newCategoryName;
  }

  hideDialog() {
    this.visibleNewCategoryDialog = false;
    this.visibleNewCategoryDialogChange.emit(false);
  }

  onSubmit() {
    this.isSubmitted.set(true);

    if (this.form.invalid) {
      return;
    }

    this.menuService
      .addCategory(this.newCategoryName.value!)
      .pipe(
        finalize(() => {
          this.hideDialog();
          this.updateCategoriesList.emit();
          this.sidenavService.updateCategories();
        }),
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'İşlem Başarısız',
            detail: err.error.message,
          });
          throw err;
        }),
      )
      .subscribe((res) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Kategori Eklendi',
          detail: res.message,
        });
      });
  }
}
