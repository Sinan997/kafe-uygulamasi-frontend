import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent{
  @Output() isSidebarOpen:EventEmitter<boolean> = new EventEmitter();
  isOpen:boolean = false;

  open(){
    this.isOpen = !this.isOpen
    this.isSidebarOpen.emit(this.isOpen)
  }
}
