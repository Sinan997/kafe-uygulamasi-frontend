import { Component, EventEmitter, Output, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-category-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  imports: [ToolbarModule],
})
export class CategoryToolbarComponent {
  @Output() addNewProductEvent = new EventEmitter<boolean>();

  router = inject(Router);

  navigateToMenu() {
    this.router.navigate(['menu']);
  }
}
