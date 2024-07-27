import { Component } from '@angular/core';
import { TableComponent } from '../../../../Components/table/table.component';
import { ArticuloService } from '../../../../Servicios/articulo.service';
import { FormularioArticulosComponent } from '../../Components/formulario-articulos/formulario-articulos.component';
import { LayoutService } from '../../../../Servicios/layout.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [TableComponent, FormularioArticulosComponent, NgClass],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.css',
})
export class ArticulosComponent {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  public columnasDisplay = [
    'Cod',
    'Ref',
    'Nombre',
    'Precio',
    'Stock',
    'Dpto',
    'Seccion',
    'Familia',
  ];
  public columnas = [
    'id',
    'ref',
    'name',
    'value',
    'stock',
    'dpto',
    'section',
    'family',
  ];

  public articulos: any[] = [];
  public articulosFiltrados: any[] = [];

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
}
