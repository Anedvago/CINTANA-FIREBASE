import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../Components/table/table.component';
import { FormularioArticulosComponent } from '../../Components/formulario-articulos/formulario-articulos.component';
import { NgClass } from '@angular/common';
import { ServicioService } from '../../../../Servicios/servicio.service';
import { LayoutService } from '../../../../Servicios/layout.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalNuevoServicioComponent } from '../../Components/modal-nuevo-servicio/modal-nuevo-servicio.component';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [TableComponent, FormularioArticulosComponent, NgClass],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
})
export class ServiciosComponent {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  public columnasDisplay = [
    'Cod',
    'Nombre',
    'Precio',
    'Dpto',
    'Seccion',
    'Familia',
  ];
  public columnas = ['id', 'name', 'value', 'dpto', 'section', 'family'];

  public servicios: any[] = [];
  public serviciosFiltrados: any[] = [];
  readonly dialog = inject(MatDialog);
  constructor(
    private servicioService: ServicioService,
    private layoutService: LayoutService
  ) {
    this.getServicios();
  }

  public getServicios(): void {
    this.servicioService.getServicios().then((data: any) => {
      this.servicios = data;
      this.serviciosFiltrados = data;
    });
  }
  public filtrarPorNombre(event: any) {
    this.serviciosFiltrados = this.servicios.filter(function (objeto) {
      function cleanString(text: string): string {
        return text
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase();
      }
      return cleanString(objeto.name)
        .toLowerCase()
        .includes(cleanString(event.toLowerCase()));
    });
  }

  public quitarFiltros() {
    this.serviciosFiltrados = this.servicios.slice();
  }
  modificarServicio(event: any) {
    this.dialog.open(ModalNuevoServicioComponent);
  }
}
