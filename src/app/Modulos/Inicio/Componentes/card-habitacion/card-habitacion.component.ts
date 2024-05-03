import { NgStyle, TitleCasePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  input,
} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LayoutService } from '../../../../Servicios/layout.service';
@Component({
  selector: 'app-card-habitacion',
  standalone: true,
  imports: [MatCardModule, TitleCasePipe, NgStyle],
  templateUrl: './card-habitacion.component.html',
  styleUrl: './card-habitacion.component.css',
})
export class CardHabitacionComponent implements OnChanges {
  @Input() color1: string = '';
  @Input() color2: string = '';
  @Input() numero: number = 0;
  @Input() totalHabitaciones: number = 0;
  porcentaje: number = (this.numero * 100) / this.totalHabitaciones;
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  constructor(private layoutService: LayoutService) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.porcentaje = (this.numero * 100) / this.totalHabitaciones;
  }
}
