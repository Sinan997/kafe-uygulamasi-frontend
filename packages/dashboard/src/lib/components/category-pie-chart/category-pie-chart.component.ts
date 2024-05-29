import { Component, OnInit, computed, inject, signal } from '@angular/core';
import Chart, { ChartDataset } from 'chart.js/auto';
import { DashboardService } from '../../services/dashboard.service';
import { forkJoin } from 'rxjs';
import { AllCategoriesModel } from '../../models/get-all-categories-model';
import { AllOrdersModel } from '../../models/get-all-orders-model';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'app-category-pie-chart',
  templateUrl: './category-pie-chart.component.html',
  imports: [FormsModule, TranslateModule],
})
export class CategoryPieChartComponent implements OnInit {
  protected readonly service = inject(DashboardService);

  pieChart: Chart<'pie', number[], string> | null;
  categoriesAndProducts = signal<AllCategoriesModel[]>([]);
  categories = computed(() => this.categoriesAndProducts().map((category) => category.name));
  pieColors = computed(() => this.generateRandomColorsArray(this.categories().length));
  selectedCategory = signal('');
  productNames = signal([]);
  orders = signal<AllOrdersModel[]>([]);

  rangeDates: Date[] | [];

  pieChartDatasetObj: ChartDataset<'pie', number[]> = {
    label: 'Dataset 1',
    data: [],
    backgroundColor: [],
  };

  setValue(val: any) {
    this.selectedCategory.set(val.target.value);
    this.generateDatasetForPieChart();
  }

  ngOnInit() {
    forkJoin([this.service.getOrders(), this.service.getCategories()]).subscribe((res) => {
      if (res[0].orders.length === 0) {
        return;
      }
      this.orders.set(res[0].orders);

      this.categoriesAndProducts.set(res[1].categories.sort((a, b) => a.index - b.index));

      // SET SELECTED CATEGORY
      this.selectedCategory.set(this.categories()[0]);

      // GENERATE PIE CHART
      this.generateDatasetForPieChart();
    });
  }

  generateDatasetForPieChart() {
    // RESET PIE CHART
    this.resetPieChart();

    const category = this.categoriesAndProducts().find(
      (category) => category.name === this.selectedCategory(),
    );

    category?.products.forEach((product) => {
      this.pieChart?.data.labels?.push(product.name);
    });
    this.pieChartDatasetObj.label = category?.name;
    this.findDataForSelectedCategory();
    // this.pieChartDatasetObj.data = [15, 25, 35];
    this.pieChartDatasetObj.backgroundColor = this.generateRandomColorsArray(
      category!.products.length,
    );
    this.pieChart?.data.datasets.push(this.pieChartDatasetObj);
    this.pieChart?.update();
  }

  findDataForSelectedCategory() {
    const category = this.categoriesAndProducts().find(
      (category) => category.name === this.selectedCategory(),
    );
    const data: number[] = [];
    category?.products.forEach((product) => {
      const productOrders = this.orders().filter((order) => order.productId.name === product.name);
      if (productOrders.length > 0) {
        const totalAmount = productOrders.reduce((acc, order) => acc + order.baseAmount, 0);
        data.push(totalAmount);
      } else {
        data.push(0);
      }
    });
    this.pieChartDatasetObj.data = [...data];
  }

  resetPieChart() {
    this.pieChart?.data.datasets.splice(0, this.pieChart?.data.datasets.length);
    this.pieChart?.data.labels?.splice(0, this.pieChart?.data.labels.length);
  }

  generateRandomColorsArray(num: number): string[] {
    const colors = [];

    for (let i = 0; i < num; i++) {
      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      colors.push(`rgb(${r}, ${g}, ${b})`);
    }

    return colors;
  }

  ngAfterViewInit(): void {
    const ctx = document.getElementById('category-chart') as HTMLCanvasElement;
    this.pieChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [],
        datasets: [],
      },
    });
  }
}
