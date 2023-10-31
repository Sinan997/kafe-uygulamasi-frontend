import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { TablesPageComponent } from './pages/tables-page/tables-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { CoreModule, JwtInterceptor } from 'core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SublevelMenuComponent } from './components/sidenav/sublevel-menu.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BodyComponent } from './components/body/body.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ErrorPageComponent,
    TablesPageComponent,
    // DashboardPageComponent,
    MenuPageComponent,
    // OrdersPageComponent,
    CategoryPageComponent,
    SublevelMenuComponent,
    SidenavComponent,
    BodyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastModule,
    CoreModule.forRoot(),
  ],
  providers: [
    MessageService,
    ConfirmationService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
