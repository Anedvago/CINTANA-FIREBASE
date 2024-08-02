import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HabitacionService } from '../../../../Servicios/habitacion.service';
import { CardHabitacionComponent } from '../../components/card-habitacion/card-habitacion.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalNuevaHabitacionComponent } from '../../components/modal-nueva-habitacion/modal-nueva-habitacion.component';

@Component({
  selector: 'app-habitaciones',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, CardHabitacionComponent],
  templateUrl: './habitaciones.component.html',
  styleUrl: './habitaciones.component.css',
})
export class HabitacionesComponent implements OnInit {
  habitaciones: any[] = [];
  constructor(
    private habitacionService: HabitacionService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.getHabitaciones();
  }
  getHabitaciones() {
    this.habitacionService
      .getSubscripcionDeHabitaciones()
      .subscribe((data: any) => {
        this.habitaciones = data;
      });
  }
  crearHabitacion() {
    const dialogRef = this.dialog.open(ModalNuevaHabitacionComponent);
    dialogRef.afterClosed().subscribe((result) => {
      this.getHabitaciones();
    });
  }
  modificarHabitacion(habitacion: any) {
    const dialogRef = this.dialog.open(ModalNuevaHabitacionComponent, {
      data: habitacion,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getHabitaciones();
    });
  }
}
