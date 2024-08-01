import { Component, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HabitacionService } from '../../../../Servicios/habitacion.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-formulario-datos-reserva',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './formulario-datos-reserva.component.html',
  styleUrl: './formulario-datos-reserva.component.css',
})
export class FormularioDatosReservaComponent implements OnInit {
  habitaciones: any[] = [];
  constructor(private habitacionService: HabitacionService) {}
  ngOnInit(): void {
    this.obtenerHabitaciones();
  }

  obtenerHabitaciones() {
    this.habitacionService.getHabitaciones().then((data) => {
      this.habitaciones = data!;
    });
  }
}
