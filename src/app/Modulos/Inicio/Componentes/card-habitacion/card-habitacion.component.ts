import { NgStyle, TitleCasePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-card-habitacion',
  standalone: true,
  imports: [MatCardModule, TitleCasePipe, NgStyle],
  templateUrl: './card-habitacion.component.html',
  styleUrl: './card-habitacion.component.css',
})
export class CardHabitacionComponent implements OnChanges {
  @Input() texto: string = 'Total Habitaciones';

  @Input() color1: string = '#3D63C7';
  @Input() color2: string = '#ABC3FF';
  @Input() numero: number = 10;
  @Input() totalHabitaciones: number = 10;
  porcentaje: number = (this.numero * 100) / this.totalHabitaciones;

  ngOnChanges(changes: SimpleChanges): void {
    this.porcentaje = (this.numero * 100) / this.totalHabitaciones;
  }
}
