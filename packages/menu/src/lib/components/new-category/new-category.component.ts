import { Component, EventEmitter, Input, Output, inject, model, output } from '@angular/core';
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
  imports: [ReactiveFormsModule, DialogModule, AutoFocusDirective, TrackEnterKeyDirective, TranslateModule, NgxValidateCoreModule],
  templateUrl: './new-category.component.html',
})
export class NewCategoryComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly menuService = inject(MenuService);
  protected readonly customMessageService = inject(CustomMessageService);

  readonly visibleNewCategoryDialog = model.required<boolean>();
  readonly updateCategoriesList = output();

  form = this.fb.group({
    newCategoryName: ['', Validators.required],
  });

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    this.menuService
      .addCategory(this.form.controls.newCategoryName.value!)
      .pipe(
        tap((res) => {
          this.visibleNewCategoryDialog.set(false);
          this.updateCategoriesList.emit();
          this.customMessageService.success(res);
        }),
      )
      .subscribe();
  }
}
