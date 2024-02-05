import { Component, DestroyRef, ElementRef, Input, ViewChild, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomMessageService, SidenavService } from 'theme-shared';
import { TrackEnterKeyDirective } from 'core';
import { MenuService } from '../../services';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryModel } from '../../models/category.model';
import { tap } from 'rxjs';

@Component({
  selector: 'app-update-cagetory',
  standalone: true,
  imports: [ReactiveFormsModule, TrackEnterKeyDirective, NgxValidateCoreModule, TranslateModule],
  templateUrl: './update-category.component.html',
})
export class UpdateCategoryComponent {
  fb = inject(FormBuilder);
  menuService = inject(MenuService);
  customMessageService = inject(CustomMessageService);
  destroyRef = inject(DestroyRef);
  activatedRoute = inject(ActivatedRoute);
  sidenavService = inject(SidenavService);
  router = inject(Router);

  @ViewChild('myInput') myInput: ElementRef;
  @Input() categoryId: string;

  category = signal<CategoryModel>({ _id: '0', index: 0, name: '', products: [] });
  isEditing = signal(false);

  form = this.fb.group({
    name: ['', Validators.required],
  });

  get name() {
    return this.form.controls.name;
  }

  ngOnInit() {
    this.menuService.getCategory(this.categoryId).subscribe((res) => {
      this.category.set(res.category);
      this.name.setValue(this.category().name);
    });
  }

  abortNewCategoryName() {
    this.isEditing.set(false);
    this.name.setValue(this.category().name);
  }

  editButton() {
    this.isEditing.set(true);
    this.myInput.nativeElement.focus();
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    if (this.category().name !== this.name.value) {
      this.menuService
        .changeCategoryName(this.name.value!, this.category()._id)
        .pipe(
          tap((res) => {
            this.isEditing.set(false);
            this.category.set(res.category);
            this.customMessageService.success(res);
            this.myInput.nativeElement.blur();
          }),
        )
        .subscribe();
      return;
    }
  }
}
