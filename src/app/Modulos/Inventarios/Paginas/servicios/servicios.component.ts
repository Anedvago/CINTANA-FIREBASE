import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../Components/table/table.component';
import { FormularioArticulosComponent } from '../../Components/formulario-articulos/formulario-articulos.component';
import { NgClass } from '@angular/common';
import { ServicioService } from '../../../../Servicios/servicio.service';
import { LayoutService } from '../../../../Servicios/layout.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalNuevoServicioComponent } from '../../Components/modal-nuevo-servicio/modal-nuevo-servicio.component';
import { TablaComponent } from '../../../../Components/tabla/tabla.component';
import { ColumnaTabla } from '../../../../Modelos/ColumnaTabla';
import { FormularioBqcComponent } from '../../../../Components/formulario-bqc/formulario-bqc.component';

@Component({
  selector: 'app-servicios',
  standalone: true,
  imports: [TablaComponent, NgClass, FormularioBqcComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css',
})
export class ServiciosComponent {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  columnas: ColumnaTabla[] = [
    { titulo: 'Cod', atributo: 'id' },
    { titulo: 'Nombre', atributo: 'name' },
    { titulo: 'Precio', atributo: 'value' },
    { titulo: 'Dpto', atributo: 'dpto' },
    { titulo: 'Seccion', atributo: 'section' },
    { titulo: 'Familia', atributo: 'family' },
  ];

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
  crearServicio() {
    const dialogRef = this.dialog.open(ModalNuevoServicioComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.getServicios();
      }
    });
  }
  modificarServicio(event: any) {
    const dialogRef = this.dialog.open(ModalNuevoServicioComponent, {
      data: event,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.getServicios();
      }
    });
  }
}
