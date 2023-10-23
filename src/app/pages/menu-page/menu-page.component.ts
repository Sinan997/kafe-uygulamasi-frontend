import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { categoryModel } from 'src/app/models/category-model';
import { MenuRequestService } from 'src/app/services/request-services/menu-request.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class MenuPageComponent implements OnInit {
  newCategoryDialog: boolean = false;
  newCategoryName: string = '';
  isTableLoading: boolean = false;
  newCategoryButtonLoading: boolean = false;
  categories: categoryModel[] = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    if (event.previousIndex !== event.currentIndex) {
      this.setIndexes();
      this.setCategoryPlacement();
    }
  }

  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private menuRequestService: MenuRequestService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.menuRequestService.getAllCategories().subscribe((res) => {
      this.categories = res.categories;
      this.isTableLoading = false;
      this.sortCategoriesByIndex();
    });
  }

  navigateToCategory(category: categoryModel) {
    this.router.navigate(['category', category._id]);
  }

  openNewCategoryDialog() {
    this.newCategoryDialog = true;
  }

  closeNewCategoryDialog() {
    this.newCategoryDialog = false;
  }

  setIndexes() {
    this.categories = this.categories.map((category, index) => {
      category.index = index;
      return category;
    });
  }

  sortCategoriesByIndex() {
    this.categories = this.categories.sort((a, b) => a.index - b.index);
  }

  addNewCategory() {
    const isCategoryNameExist = this.categories.find((cat) => cat.title === this.newCategoryName);
    if (isCategoryNameExist) {
      return this.messageService.add({
        severity: 'error',
        summary: 'İşlem Başarısız',
        detail: 'Bu İsimde Kategori Bulunmakta',
      });
    }

    this.newCategoryButtonLoading = true;
    this.menuRequestService.addCategory(this.newCategoryName, this.categories.length).subscribe({
      next: (res) => {
        const category = res.category!;
        this.categories.push(category);
        this.newCategoryName = '';
        this.newCategoryDialog = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Kategori Eklendi',
          detail: res.message,
        });
      },
      error: (err) => {
        console.log(err);
        this.messageService.add({
          severity: 'error',
          summary: 'İşlem Başarısız',
          detail: err.error.message,
        });
      },
      complete: () => {
        this.newCategoryButtonLoading = false;
      },
    });
  }

  deleteCategory(deletedCategory: categoryModel) {
    this.isTableLoading = true;
    this.menuRequestService.deleteCategory(deletedCategory._id).subscribe({
      next: (res) => {
        this.categories = this.categories.filter(
          (category) => category._id !== deletedCategory._id,
        );
        this.setIndexes();
        this.menuRequestService.setCategoriesIndex(this.categories).subscribe({
          next: () => {
            this.messageService.add({
              severity: 'success',
              summary: 'Kategori Silindi',
              detail: res.message,
            });
          },
          error: (err) => {
            console.log('err', err);
            this.messageService.add({
              severity: 'success',
              summary: 'Kategori Silindi',
              detail: err.error.message,
            });
          },
          complete: () => {
            this.isTableLoading = false;
          },
        });
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {
        this.isTableLoading = false;
      },
    });
  }

  setCategoryPlacement() {
    this.isTableLoading = true;
    this.menuRequestService.setCategoriesIndex(this.categories).subscribe({
      next: (res) => {
        console.log(res);
        this.messageService.add({
          severity: 'success',
          summary: 'Sıralama değişti',
          detail: res.message,
        });
        this.isTableLoading = false;
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }
}
