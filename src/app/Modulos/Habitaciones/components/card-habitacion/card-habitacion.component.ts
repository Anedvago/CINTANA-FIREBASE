import { NgClass, NgStyle, TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-habitacion',
  standalone: true,
  imports: [MatCardModule, NgStyle, NgClass, TitleCasePipe, MatButtonModule],
  templateUrl: './card-habitacion.component.html',
  styleUrl: './card-habitacion.component.css',
})
export class CardHabitacionComponent {
  @Input() room!: any;
}
