import { NgStyle, TitleCasePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-card-habitacion',
  standalone: true,
  imports: [MatCardModule, NgStyle, TitleCasePipe],
  templateUrl: './card-habitacion.component.html',
  styleUrl: './card-habitacion.component.css',
})
export class CardHabitacionComponent implements OnChanges {
  @Input()
  public color1!: string;
  @Input()
  public color2!: string;
  @Input()
  public numeroHabitaciones!: number;
  @Input()
  public texto!: string;

  public totalNumberRooms: number = 10;
  public porcent: number =
    (this.numeroHabitaciones * 100) / this.totalNumberRooms;

  ngOnChanges(changes: SimpleChanges): void {
    this.porcent = (this.numeroHabitaciones * 100) / this.totalNumberRooms;
  }
}
