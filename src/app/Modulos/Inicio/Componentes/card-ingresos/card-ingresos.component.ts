import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { LayoutService } from '../../../../Servicios/layout.service';

@Component({
  selector: 'app-card-ingresos',
  standalone: true,
  imports: [MatCardModule, NgxChartsModule],
  templateUrl: './card-ingresos.component.html',
  styleUrl: './card-ingresos.component.css',
})
export class CardIngresosComponent {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  public monthsValue: { name: string; value: number }[] = [
    { name: 'Mar', value: 50000 },
    { name: 'Abr', value: 60000 },
    { name: 'May', value: 75000 },
    { name: 'Jun', value: 90000 },
    { name: 'Jul', value: 85000 },
    { name: 'Ago', value: 100000 },
    { name: 'Sep', value: 50000 },
    { name: 'Oct', value: 60000 },
    { name: 'Nov', value: 75000 },
  ];

  public view: [number, number] = this.esMovil
    ? [360, 100]
    : this.esTablet
    ? [490, 150]
    : [470, 130];

  public gradient = false;
  public showXAxis = true;

  public colorScheme: string | Color = {
    name: 'Color1',
    selectable: true,
    group: ScaleType.Linear,
    domain: ['#3056D3', '#61BD5F', '#BB4141', '#F19221'],
  };

  constructor(private layoutService: LayoutService) {}
}
