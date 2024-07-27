import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LayoutService } from '../../../../Servicios/layout.service';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-formulario-articulos',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
    TitleCasePipe,
  ],
  templateUrl: './formulario-articulos.component.html',
  styleUrl: './formulario-articulos.component.css',
})
export class FormularioArticulosComponent {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  @Input() formularioPara: string = '';
  constructor(private layoutService: LayoutService) {}
}
