import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardHabitacionComponent } from '../../Componentes/card-habitacion/card-habitacion.component';
import { LayoutService } from '../../../../Servicios/layout.service';
import { CardIngresosComponent } from '../../Componentes/card-ingresos/card-ingresos.component';
import { CardClientesComponent } from '../../Componentes/card-clientes/card-clientes.component';
import { CardStockBajoComponent } from '../../Componentes/card-stock-bajo/card-stock-bajo.component';
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    MatGridListModule,
    CardHabitacionComponent,
    CardIngresosComponent,
    CardClientesComponent,
    CardStockBajoComponent,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  constructor(private layoutService: LayoutService) {}
}
