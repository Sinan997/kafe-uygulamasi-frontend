import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { tap } from 'rxjs';
import { AutoFocusDirective, TrackEnterKeyDirective } from 'core';
import { MenuService } from '../../services/menu.service';
import { TranslateModule } from '@ngx-translate/core';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { CustomMessageService } from 'theme-shared';
@Component({
  selector: 'app-new-category-modal',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    AutoFocusDirective,
    TrackEnterKeyDirective,
    TranslateModule,
    NgxValidateCoreModule,
  ],
  templateUrl: './new-category.component.html',
})
export class NewCategoryComponent {
  @Input() visibleNewCategoryDialog = true;
  @Output() visibleNewCategoryDialogChange = new EventEmitter<boolean>();
  @Output() updateCategoriesList = new EventEmitter<boolean>();

  fb = inject(FormBuilder);
  menuService = inject(MenuService);
  customMessageService = inject(CustomMessageService);

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
    if (this.form.invalid) {
      return;
    }
    this.menuService
      .addCategory(this.newCategoryName.value!)
      .pipe(
        tap((res) => {
          this.hideDialog();
          this.updateCategoriesList.emit();
          this.customMessageService.success(res);
        }),
      )
      .subscribe();
  }
}
