import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PrimeModule } from './prime.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { TablesPageComponent } from './pages/tables-page/tables-page.component';
import { WaiterPageComponent } from './pages/waiter-page/waiter-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';

@NgModule({
  declarations: [AppComponent, LoginPageComponent, RegisterPageComponent, HomeComponent, ErrorPageComponent, SidebarComponent, DashboardPageComponent, TablesPageComponent, WaiterPageComponent, MenuPageComponent, OrdersPageComponent, CategoryPageComponent],
  imports: [
    BrowserModule,
    PrimeModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
