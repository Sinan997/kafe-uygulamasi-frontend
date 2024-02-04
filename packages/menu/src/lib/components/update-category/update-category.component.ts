import { Component, DestroyRef, ElementRef, Input, ViewChild, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MessageService } from 'primeng/api';
import { catchError, finalize } from 'rxjs';
import { SidenavService } from 'theme-shared';
import { TrackEnterKeyDirective } from 'core';
import { MenuService } from '../../services';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { TranslateModule } from '@ngx-translate/core';
import { CategoryModel } from '../../models/category.model';

@Component({
  selector: 'app-update-cagetory',
  standalone: true,
  imports: [ReactiveFormsModule, TrackEnterKeyDirective, NgxValidateCoreModule, TranslateModule],
  templateUrl: './update-category.component.html',
})
export class UpdateCategoryComponent {
  fb = inject(FormBuilder);
  menuService = inject(MenuService);
  messageService = inject(MessageService);
  destroyRef = inject(DestroyRef);
  activatedRoute = inject(ActivatedRoute);
  sidenavService = inject(SidenavService);
  router = inject(Router);

  @ViewChild('myInput') myInput: ElementRef;
  @Input() categoryId: string;

  category = signal<CategoryModel>({ _id: '0', index: 0, name: '', products: [] });
  isEditing = false;
  isSubmitted = signal(false);

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
    // this.isEditing = false;
    // this.name.setValue(this.category().name);
    // this.isSubmitted.set(false);
  }

  editButton() {
    this.isEditing = true;
    this.myInput.nativeElement.focus();
  }

  onSubmit() {
    // this.isSubmitted.set(true);
    // if (this.form.invalid) {
    //   return;
    // }
    // if (this.category().name !== this.name.value) {
    //   this.categoryService
    //     .changeCategoryName(this.name.value!, this.category()._id)
    //     .pipe(
    //       finalize(() => {
    //         this.isSubmitted.set(false);
    //         this.isEditing = false;
    //       }),
    //       catchError((err) => {
    //         throw err;
    //       }),
    //     )
    //     .subscribe((res) => {
    //       this.messageService.add({
    //         severity: 'success',
    //         detail: res.message,
    //       });
    //       this.sidenavService.updateCategories();
    //       this.category.set(res.category);
    //     });
    //   return;
    // }
    // this.isEditing = false;
  }
}
