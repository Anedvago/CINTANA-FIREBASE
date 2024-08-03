import { Component } from '@angular/core';
import { TableComponent } from '../../../../Components/table/table.component';
import { NgClass } from '@angular/common';
import { LayoutService } from '../../../../Servicios/layout.service';
import { FormularioBqcComponent } from '../../../../Components/formulario-bqc/formulario-bqc.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [TableComponent, FormularioBqcComponent, NgClass],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent {
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

  clientes: any[] = [];
  clientesFiltrados: any[] = [];

  constructor(private layoutService: LayoutService) {}

  modificarCliente(cliente: any) {}
}
