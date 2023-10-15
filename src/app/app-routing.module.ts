import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { isLoggedIn } from './guards/auth.guard';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { MenuPageComponent } from './pages/menu-page/menu-page.component';
import { WaiterPageComponent } from './pages/waiter-page/waiter-page.component';
import { TablesPageComponent } from './pages/tables-page/tables-page.component';
import { OrdersPageComponent } from './pages/orders-page/orders-page.component';
import { CategoryPageComponent } from './pages/category-page/category-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [isLoggedIn]},
  { path: 'dashboard', component: DashboardPageComponent },
  { path: 'tables', component: TablesPageComponent },
  { path: 'waiter', component: WaiterPageComponent },
  { path: 'orders', component: OrdersPageComponent },
  { path: 'menu', component: MenuPageComponent },
  { path: 'category/:id', component: CategoryPageComponent },
  { path: 'login', loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)},
  { path: '**', component: ErrorPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
