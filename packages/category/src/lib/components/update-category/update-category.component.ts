import { Component, DestroyRef, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { catchError, finalize } from 'rxjs';
import { SidenavService } from 'theme-shared';
import { categoryModel } from 'src/app/models/category-model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-update-cagetory',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './update-category.component.html',
})
export class UpdateCategoryComponent {
  fb = inject(FormBuilder);
  categoryService = inject(CategoryService);
  messageService = inject(MessageService);
  destroyRef = inject(DestroyRef);
  activatedRoute = inject(ActivatedRoute);
  sidenavService = inject(SidenavService);

  category = signal<categoryModel>({ _id: '0', index: 0, title: '' });
  isEditing = false;
  isSubmitted = signal(false);

  form = this.fb.group({
    name: ['', Validators.required],
  });

  get name() {
    return this.form.controls.name;
  }

  ngOnInit() {
    this.activatedRoute.params.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((changed) => {
      const categoryId = changed['id'];
      this.categoryService.getCategory(categoryId).subscribe((res) => {
        this.category.set(res.category);
        this.name.setValue(this.category().title);
      });
    });
  }

  abortNewCategoryName() {
    this.isEditing = false;
    this.name.setValue(this.category().title);
    this.isSubmitted.set(false);
  }

  onSubmit() {
    this.isSubmitted.set(true);
    if (this.form.invalid) {
      return;
    }
    if (this.category().title !== this.name.value) {
      this.categoryService
        .changeCategoryName(this.name.value!, this.category()._id)
        .pipe(
          finalize(() => {
            this.isSubmitted.set(false);
            this.isEditing = false;
          }),
          catchError((err) => {
            throw err;
          }),
        )
        .subscribe((res) => {
          this.messageService.add({
            severity: 'success',
            detail: res.message,
          });
          this.sidenavService.updateCategories();
          this.category.set(res.category);
        });
    }
  }
}
