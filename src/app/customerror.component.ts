import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ValidationErrorComponent } from '@ngx-validate/core';

@Component({
  selector: 'app-custom-error',
  standalone: true,
  imports: [NgFor, TranslateModule],
  template: `
    <span class="text-danger" *ngFor="let error of errors">
      {{ this.localizationKey + error.key | translate: error.params }}
    </span>
  `,
})
export class CustomErrorComponent extends ValidationErrorComponent {
  localizationKey = 'validator.';
}