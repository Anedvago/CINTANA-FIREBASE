import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { CardHabitacionComponent } from '../../Componentes/card-habitacion/card-habitacion.component';
import { LayoutService } from '../../../../Servicios/layout.service';
import { CardIngresosComponent } from '../../Componentes/card-ingresos/card-ingresos.component';
import { CardClientesComponent } from '../../Componentes/card-clientes/card-clientes.component';
import { CardStockBajoComponent } from '../../Componentes/card-stock-bajo/card-stock-bajo.component';
import { HabitacionService } from '../../../../Servicios/habitacion.service';
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
export class InicioComponent implements OnInit {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  cantidadDeHabitaciones = 0;
  cantidadDeHabitacionesOcupadas = 0;
  cantidadDeHabitacionesReservadas = 0;
  cantidadDeHabitacionesLibres = 0;

  constructor(
    private layoutService: LayoutService,
    private habitacionService: HabitacionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.obtenerDatosParaCards();
  }
  obtenerDatosParaCards() {
    this.obtenerDatosDeHabitaciones();
  }

  obtenerDatosDeHabitaciones() {
    this.habitacionService
      .getSubscripcionDeHabitaciones()
      .subscribe((data: any) => {
        const cantidadDeHabitaciones = data.length;
        let cantidadDeHabitacionesOcupadas = 0;
        let cantidadDeHabitacionesReservadas = 0;
        let cantidadDeHabitacionesLibres = 0;
        data.forEach((element: any) => {
          if (element.state == 'ocupada') {
            cantidadDeHabitacionesOcupadas++;
          } else if (element.state == 'reservada') {
            cantidadDeHabitacionesReservadas++;
          } else {
            cantidadDeHabitacionesLibres++;
          }
        });
        this.cantidadDeHabitaciones = cantidadDeHabitaciones;
        this.cantidadDeHabitacionesOcupadas = cantidadDeHabitacionesOcupadas;
        this.cantidadDeHabitacionesReservadas =
          cantidadDeHabitacionesReservadas;
        this.cantidadDeHabitacionesLibres = cantidadDeHabitacionesLibres;
        this.cdr.detectChanges();
      });
  }
}
