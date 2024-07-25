import { TitleCasePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-opcion',
  standalone: true,
  imports: [MatCardModule, TitleCasePipe],
  templateUrl: './card-opcion.component.html',
  styleUrl: './card-opcion.component.css',
})
export class CardOpcionComponent {
  @Input()
  public img!: string;
  @Input()
  public title!: string;
}
