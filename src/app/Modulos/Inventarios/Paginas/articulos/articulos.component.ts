import { Component, inject } from '@angular/core';
import { TableComponent } from '../../../../Components/table/table.component';
import { ArticuloService } from '../../../../Servicios/articulo.service';
import { FormularioArticulosComponent } from '../../Components/formulario-articulos/formulario-articulos.component';
import { LayoutService } from '../../../../Servicios/layout.service';
import { NgClass } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalNuevoArticuloComponent } from '../../Components/modal-nuevo-articulo/modal-nuevo-articulo.component';
import { TablaComponent } from '../../../../Components/tabla/tabla.component';
import { ColumnaTabla } from '../../../../Modelos/ColumnaTabla';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [
    TableComponent,
    FormularioArticulosComponent,
    NgClass,
    TablaComponent,
  ],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.css',
})
export class ArticulosComponent {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;

  columnasTabla: ColumnaTabla[] = [
    { titulo: 'Cod', atributo: 'id' },
    { titulo: 'Ref', atributo: 'ref' },
    { titulo: 'Nombre', atributo: 'name' },
    { titulo: 'Precio', atributo: 'value' },
    { titulo: 'Stock', atributo: 'stock' },
    { titulo: 'Dpto', atributo: 'dpto' },
    { titulo: 'Seccion', atributo: 'section' },
    { titulo: 'Familia', atributo: 'family' },
  ];

  public articulos: any[] = [];
  public articulosFiltrados: any[] = [];
  readonly dialog = inject(MatDialog);
  constructor(
    private articuloService: ArticuloService,
    private layoutService: LayoutService
  ) {
    this.getArticulos();
  }

  public getArticulos(): void {
    this.articuloService.getArticulos().then((data: any) => {
      this.articulos = data;
      this.articulosFiltrados = data;
    });
  }
  public filtrarPorNombre(event: any) {
    this.articulosFiltrados = this.articulos.filter(function (objeto) {
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
    this.articulosFiltrados = this.articulos.slice();
  }

  modificarArticulo(event: any) {
    const dialogRef = this.dialog.open(ModalNuevoArticuloComponent, {
      data: event,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.getArticulos();
      }
    });
  }
}
