import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../../Components/table/table.component';
import { NgClass } from '@angular/common';
import { LayoutService } from '../../../../Servicios/layout.service';
import { FormularioBqcComponent } from '../../../../Components/formulario-bqc/formulario-bqc.component';
import { ClienteService } from '../../../../Servicios/cliente.service';
import { TablaComponent } from '../../../../Components/tabla/tabla.component';
import { ColumnaTabla } from '../../../../Modelos/ColumnaTabla';
import { MatDialog } from '@angular/material/dialog';
import { ModalNuevoClienteComponent } from '../../components/modal-nuevo-cliente/modal-nuevo-cliente.component';

@Component({
  selector: 'app-clientes',
  standalone: true,
  imports: [FormularioBqcComponent, NgClass, TablaComponent],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css',
})
export class ClientesComponent implements OnInit {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;

  public columnas: ColumnaTabla[] = [
    { titulo: 'Tipo Id', atributo: 'typeIdentification' },
    { titulo: 'Identificacion', atributo: 'identification' },
    { titulo: 'Nombre', atributo: 'name' },
    { titulo: 'Telefono', atributo: 'phone' },
    { titulo: 'Correo electronico', atributo: 'email' },
  ];

  clientes: any[] = [];
  clientesFiltrados: any[] = [];
  readonly dialog = inject(MatDialog);
  constructor(
    private layoutService: LayoutService,
    private clienteService: ClienteService
  ) {}
  ngOnInit(): void {
    this.obtenerTodosLosClientes();
  }
  obtenerTodosLosClientes() {
    this.clienteService.getClientes().then((data) => {
      this.clientes = data!;
      this.clientesFiltrados = data!;
    });
  }

  public filtrarPorNombre(event: any) {
    this.clientesFiltrados = this.clientes.filter(function (objeto) {
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
    this.clientesFiltrados = this.clientes.slice();
  }

  crearNuevoCliente() {
    const dialogRef = this.dialog.open(ModalNuevoClienteComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.obtenerTodosLosClientes();
      }
    });
  }
  modificarCliente(event: any) {
    const dialogRef = this.dialog.open(ModalNuevoClienteComponent, {
      data: event,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        this.obtenerTodosLosClientes();
      }
    });
  }
}
