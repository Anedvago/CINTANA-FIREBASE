import { Component } from '@angular/core';
import { FormularioBuscarClienteComponent } from '../../../../Components/formulario-buscar-cliente/formulario-buscar-cliente.component';
import { FormularioDatosReservaComponent } from '../formulario-datos-reserva/formulario-datos-reserva.component';
import { FormularioServiciosComponent } from '../formulario-servicios/formulario-servicios.component';

@Component({
  selector: 'app-modal-crear-reserva',
  standalone: true,
  imports: [
    FormularioBuscarClienteComponent,
    FormularioDatosReservaComponent,
    FormularioServiciosComponent,
  ],
  templateUrl: './modal-crear-reserva.component.html',
  styleUrl: './modal-crear-reserva.component.css',
})
export class ModalCrearReservaComponent {
  cliente: any;
  obtenerCliente(cliente: any) {
    this.cliente = cliente;
  }
}
