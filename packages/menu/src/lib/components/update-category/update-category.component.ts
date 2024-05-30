import { Component, DestroyRef, ElementRef, inject, input, model, signal, viewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';
import { TranslateModule } from '@ngx-translate/core';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { CustomMessageService } from 'theme-shared';
import { TrackEnterKeyDirective } from 'core';
import { MenuService } from '../../services';

@Component({
  selector: 'app-update-cagetory',
  standalone: true,
  imports: [ReactiveFormsModule, TrackEnterKeyDirective, NgxValidateCoreModule, TranslateModule],
  templateUrl: './update-category.component.html',
})
export class UpdateCategoryComponent {
  protected readonly fb = inject(FormBuilder);
  protected readonly menuService = inject(MenuService);
  protected readonly customMessageService = inject(CustomMessageService);
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly activatedRoute = inject(ActivatedRoute);
  protected readonly router = inject(Router);

  readonly myInput = viewChild<ElementRef>('myInput');
  readonly categoryId = input.required<string>();
  readonly categoryName = model.required<string>();

  isEditing = signal(false);

  form = this.fb.group({
    name: ['', Validators.required],
  });

  get name() {
    return this.form.controls.name;
  }

  ngOnInit() {
    this.name.setValue(this.categoryName());
  }

  abortNewCategoryName() {
    this.isEditing.set(false);
    this.name.setValue(this.categoryName());
  }

  editButton() {
    this.isEditing.set(true);
    this.myInput()?.nativeElement.focus();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.categoryName() !== this.name.value) {
      this.menuService
        .changeCategoryName(this.name.value!, this.categoryId())
        .pipe(
          tap((res) => {
            this.isEditing.set(false);
            this.categoryName.set(this.name.value!);
            this.myInput()?.nativeElement.blur();
            this.customMessageService.success(res);
          }),
        )
        .subscribe();
    }
  }
}
