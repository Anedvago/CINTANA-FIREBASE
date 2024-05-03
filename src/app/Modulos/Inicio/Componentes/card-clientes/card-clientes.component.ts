import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-card-clientes',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './card-clientes.component.html',
  styleUrl: './card-clientes.component.css',
})
export class CardClientesComponent {}
