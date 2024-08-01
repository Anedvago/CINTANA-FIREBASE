import { Component } from '@angular/core';
import { FormularioBuscarClienteComponent } from '../../../../Components/formulario-buscar-cliente/formulario-buscar-cliente.component';
import { FormularioDatosReservaComponent } from '../formulario-datos-reserva/formulario-datos-reserva.component';
import { AlertaService } from '../../../../Servicios/alerta.service';
import { FechaService } from '../../../../Servicios/fecha.service';

@Component({
  selector: 'app-modal-crear-reserva',
  standalone: true,
  imports: [FormularioBuscarClienteComponent, FormularioDatosReservaComponent],
  templateUrl: './modal-crear-reserva.component.html',
  styleUrl: './modal-crear-reserva.component.css',
})
export class ModalCrearReservaComponent {
  cliente: any;
  constructor(
    private alertaService: AlertaService,
    private fechaService: FechaService
  ) {}
  obtenerCliente(cliente: any) {
    this.cliente = cliente;
  }
  registrarReserva(reserva: any) {
    if (this.cliente != undefined) {
      const reservacion = {
        start: this.fechaService.convertirFechaConHora(
          reserva.fechaInicial,
          reserva.horaEntrada
        ),
        end: this.fechaService.convertirFechaConHora(
          reserva.fechaFinal,
          reserva.horaSalida
        ),
        room: reserva.habitacion,
        customer: this.cliente.id,
        total: reserva.totalAPagar,
        paid: reserva.totalCancelado,
        wayToPay: reserva.metodoDePago,
        numberOfAdults: reserva.adultos,
        numberOfChilds: reserva.niños ? reserva.niños : 0,
      };
      console.log(reservacion);
    } else {
      this.alertaService.error('Escoja un cliente');
    }
  }
}
