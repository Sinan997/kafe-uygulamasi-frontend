import { Directive, ElementRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[autofocus]',
})
export class AutoFocusDirective {
  constructor(private host: ElementRef) {}

  ngAfterViewInit() {
    this.host.nativeElement.focus();
  }
}
