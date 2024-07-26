import { Component } from '@angular/core';
import { TableComponent } from '../../../../Components/table/table.component';
import { ArticuloService } from '../../../../Servicios/articulo.service';
import { FormularioArticulosComponent } from '../../Components/formulario-articulos/formulario-articulos.component';

@Component({
  selector: 'app-articulos',
  standalone: true,
  imports: [TableComponent, FormularioArticulosComponent],
  templateUrl: './articulos.component.html',
  styleUrl: './articulos.component.css',
})
export class ArticulosComponent {
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

  constructor(private articuloService: ArticuloService) {
    this.getArticulos();
  }

  public getArticulos(): void {
    this.articuloService.getArticulos().then((data: any) => {
      this.articulos = data;
      this.articulosFiltrados = data;
    });
  }
}
