import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { LayoutService } from '../../../../Servicios/layout.service';
import { NgClass, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ModalNuevoArticuloComponent } from '../modal-nuevo-articulo/modal-nuevo-articulo.component';
import { ModalNuevoServicioComponent } from '../modal-nuevo-servicio/modal-nuevo-servicio.component';

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
    FormsModule,
  ],
  templateUrl: './formulario-articulos.component.html',
  styleUrl: './formulario-articulos.component.css',
})
export class FormularioArticulosComponent {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  parametroBusqueda: string = '';
  @Input() formularioPara: string = '';
  @Output() clickBuscar = new EventEmitter<string>();
  @Output() clickQuitarFiltros = new EventEmitter();
  @Output() articuloCreado = new EventEmitter();
  readonly dialog = inject(MatDialog);
  constructor(private layoutService: LayoutService) {}
  limpiarFiltro() {
    this.parametroBusqueda = '';
  }
  crear() {
    if (this.formularioPara == 'ARTICULOS') {
      const dialogRef = this.dialog.open(ModalNuevoArticuloComponent);
      dialogRef.afterClosed().subscribe((result) => {
        if (result !== undefined) {
          this.articuloCreado.emit(result);
        }
      });
    } else {
      this.dialog.open(ModalNuevoServicioComponent);
    }
  }
}
