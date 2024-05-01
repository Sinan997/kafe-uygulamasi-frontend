import {
  Directive,
  Input,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';
import { AuthService } from '../services';

@Directive({
  standalone: true,
  selector: '[permissionDirective]',
})
export class PermissionDirective {
  protected readonly templateRef = inject(TemplateRef);
  protected readonly viewContainerRef = inject(ViewContainerRef);
  protected readonly authService = inject(AuthService);

  @Input() permissionDirective: string;

  ngOnChanges(changes: SimpleChanges): void {
    const userRole = this.authService.userValue?.role;
    if (userRole === this.permissionDirective) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
