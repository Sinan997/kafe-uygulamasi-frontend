import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { categoryModel } from 'src/app/models/categoryModel';
import { MenuRequestService } from 'src/app/services/request-services/menu-request.service';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class MenuPageComponent implements OnInit{
  newCategoryDialog: boolean = false;
  newCategoryName: string = '';
  menuForm = this.fb.group({
    title: ['', Validators.required],
  });

  categories?: categoryModel[] = [];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories!, event.previousIndex, event.currentIndex);
    this.setIndexes();
  }

  submitted: boolean = false;

  constructor(
    private fb: FormBuilder,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private menuRequestService: MenuRequestService
  ) {}

  ngOnInit(): void {
    this.menuRequestService.getAllCategories().subscribe(res => {
      this.categories = res.categories
    })
  }

  clicked(val: any) {
    console.log('tıklandı', val);
  }

  openNewCategoryDialog() {
    this.newCategoryDialog = true;
  }

  closeNewCategoryDialog() {
    this.newCategoryDialog = false;
  }

  setIndexes() {
    // this.categories = this.categories.map((category, index) => {
    //   category.index = index;
    //   return category;
    // });
  }

  addNewCategory() {
    // this.categories.push({
    //   title: this.newCategoryName,
    //   id: Math.random(),
    //   index: this.categories.length,
    // });
    this.newCategoryName = '';
    this.newCategoryDialog = false;
  }

  deleteCategory(deletedCategory: { title: string; id: number }) {
    // this.categories = this.categories.filter(
    //   (category) => category.id !== deletedCategory.id
    // );
    this.setIndexes();
  }

  setCategoryPlacement() {
    console.log(this.categories);
  }

  get title() {
    return this.menuForm.get('title');
  }
}
