import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { categoryModel } from 'src/app/models/category-model';
import { productModel } from 'src/app/models/product-model';
// import { MenuService } from '../../services/menu.service';
import { CategoryToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  standalone: true,
  imports: [CategoryToolbarComponent],
})
export class CategoryComponent {
  products: productModel[] = [];
  category: categoryModel = { _id: '0', index: 0, title: '' };
  categoryTitle: string = '';
  isEditing: boolean = false;
  newProductDialog: boolean = false;
  submitted?: boolean;
  isEdit: boolean = false;

  productForm = this.fb.group({
    _id: '',
    name: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]],
    isAvailable: [true, Validators.required],
  });

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    // private menuService: MenuService,
    private router: Router,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    const categoryId = this.router.url.split('/').at(-1)!;
    // this.menuService.getAllProducts(categoryId).subscribe((res) => {
    //   this.products = res.products;
    //   this.category = res.category;
    //   this.categoryTitle = res.category.title;
    //   this.sortProductsByIndex();
    // });
  }

  openNewProductDialog() {
    this.isEdit = false;
    this.submitted = false;
    this.newProductDialog = true;
  }

  hideDialog() {
    this.newProductDialog = false;
    this.resetForm();
  }


  saveNewCategoryName() {
    // if (this.categoryTitle !== this.category.title) {
    //   this.menuService.changeCategoryName(this.categoryTitle, this.category._id).subscribe({
    //     next: (res) => {
    //       this.categoryTitle = res.category.title;
    //       this.category = res.category;
    //     },
    //     error: (err) => {
    //       console.log(err);
    //     },
    //   });
    // }
    // this.isEditing = false;
  }

  abortNewCategoryName() {
    this.categoryTitle = this.category.title;
    this.isEditing = false;
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.products, event.previousIndex, event.currentIndex);
    if (event.previousIndex !== event.currentIndex) {
      this.setIndexes();
      this.setProductPlacement();
    }
  }

  setIndexes() {
    this.products = this.products.map((product, index) => {
      product.index = index;
      return product;
    });
  }

  sortProductsByIndex() {
    this.products = this.products.sort((a, b) => a.index - b.index);
  }

  setProductPlacement() {
    // this.menuService.setProductsIndex(this.products).subscribe({
    //   next: (res) => {},
    //   error: (err) => {
    //     console.log('err', err);
    //   },
    // });
  }

  deleteProduct(product: productModel) {
    // console.log('deleteproduct', product);
    // this.menuService.deleteProduct(product._id).subscribe({
    //   next: (res) => {
    //     console.log(res);
    //     this.products = this.products.filter((prod) => prod._id !== product._id);
    //     this.setIndexes();
    //     this.menuService.setProductsIndex(this.products).subscribe({
    //       next: (res) => {
    //         console.log(res);
    //       },
    //       error: (err) => {
    //         console.log('err', err);
    //       },
    //     });
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    // });
  }

  addNewProduct() {
    // this.submitted = true;
    // const newProduct = this.productForm.value as productModel;
    // if (!this.isEdit) {
    //   this.menuService
    //     .addProduct(
    //       this.category._id,
    //       newProduct.name,
    //       this.products.length,
    //       newProduct.price,
    //       newProduct.isAvailable,
    //     )
    //     .subscribe({
    //       next: (res) => {
    //         this.products.push(res.product);
    //         this.newProductDialog = false;
    //         this.submitted = false;
    //         this.resetForm();
    //       },
    //       error: (err) => {
    //         console.log(err);
    //       },
    //     });
    // } else {
    //   this.menuService
    //     .updateProduct(newProduct.name, newProduct.price, newProduct.isAvailable, newProduct._id)
    //     .subscribe({
    //       next: (res) => {
    //         this.products = this.products.map((product) => {
    //           if (product._id === res.product._id) {
    //             product = { ...res.product };
    //           }
    //           return product;
    //         });
    //         this.newProductDialog = false;
    //         this.submitted = false;
    //         this.resetForm();
    //       },
    //       error: (err) => {
    //         console.log(err);
    //       },
    //     });
    // }
  }

  editProduct(product: productModel) {
    this.isEdit = true;
    this.newProductDialog = true;
    this.productForm.setValue({
      name: product.name,
      price: product.price,
      isAvailable: product.isAvailable,
      _id: product._id,
    });
  }

  resetForm() {
    this.productForm.reset({
      name: '',
      price: 0,
      isAvailable: true,
    });
  }

  get name() {
    return this.productForm.get('name');
  }

  get price() {
    return this.productForm.get('price');
  }

  get isAvailable() {
    return this.productForm.get('isAvailable');
  }
}
