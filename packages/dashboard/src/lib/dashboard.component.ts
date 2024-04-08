import { Component } from '@angular/core';
import { CategoryPieChartComponent } from './components/category-pie-chart/category-pie-chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CategoryPieChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
