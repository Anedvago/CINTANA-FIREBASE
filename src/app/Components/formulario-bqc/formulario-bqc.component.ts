import { NgClass, TitleCasePipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LayoutService } from '../../Servicios/layout.service';

@Component({
  selector: 'app-formulario-bqc',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
    TitleCasePipe,
    FormsModule,
  ],
  templateUrl: './formulario-bqc.component.html',
  styleUrl: './formulario-bqc.component.css',
})
export class FormularioBqcComponent {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  parametroBusqueda: string = '';
  @Input() formularioPara: string = '';
  @Output() clickBuscar = new EventEmitter<string>();
  @Output() clickQuitarFiltros = new EventEmitter();
  @Output() clickCrear = new EventEmitter();
  constructor(private layoutService: LayoutService) {}
  limpiarFiltro() {
    this.parametroBusqueda = '';
  }
}
