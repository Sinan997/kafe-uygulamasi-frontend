import { Component, inject, output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-product-toolbar',
  standalone: true,
  templateUrl: './product-toolbar.component.html',
  imports: [ToolbarModule, TranslateModule],
})
export class ProductToolbarComponent {
  protected readonly router = inject(Router);

  readonly addNewProductEvent = output();

  navigateToMenu() {
    this.router.navigate(['menu']);
  }
}
