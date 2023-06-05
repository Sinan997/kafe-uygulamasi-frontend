import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { sidebarPageModel } from './models/sidebarPageModel';
import { User } from './models/userModel';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit{
  isSidebarOpen: boolean = false;
  pages: sidebarPageModel[] = [];

  constructor(public authService:AuthService){}
  
  ngOnInit(): void {
    console.log('this.pages in app.component ngOnInit',this.pages);
  }

  handleSidebar(val: boolean) {
    this.isSidebarOpen = val;
  }

  logout(){
    this.authService.logout()
  }
}
