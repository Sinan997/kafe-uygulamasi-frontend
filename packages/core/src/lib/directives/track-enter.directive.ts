import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[enterKey]',
})
export class TrackEnterKeyDirective {
  @Output() enterKey: EventEmitter<void> = new EventEmitter<void>();

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    event.preventDefault();
    this.enterKey.emit();
  }
}
