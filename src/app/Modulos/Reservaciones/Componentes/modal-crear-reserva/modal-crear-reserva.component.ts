import { Component, Inject, OnInit } from '@angular/core';
import { FormularioBuscarClienteComponent } from '../../../../Components/formulario-buscar-cliente/formulario-buscar-cliente.component';
import { FormularioDatosReservaComponent } from '../formulario-datos-reserva/formulario-datos-reserva.component';
import { AlertaService } from '../../../../Servicios/alerta.service';
import { FechaService } from '../../../../Servicios/fecha.service';
import { ReservaService } from '../../../../Servicios/reserva.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../../../Servicios/cliente.service';

@Component({
  selector: 'app-modal-crear-reserva',
  standalone: true,
  imports: [FormularioBuscarClienteComponent, FormularioDatosReservaComponent],
  templateUrl: './modal-crear-reserva.component.html',
  styleUrl: './modal-crear-reserva.component.css',
})
export class ModalCrearReservaComponent implements OnInit {
  cliente: any;
  reserva: any;
  constructor(
    private alertaService: AlertaService,
    private fechaService: FechaService,
    private reservaService: ReservaService,
    public dialogRef: MatDialogRef<ModalCrearReservaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    if (this.data) {
      this.reserva = this.data;
      this.cliente = this.data.customer;
    }
  }
  obtenerCliente(cliente: any) {
    this.cliente = cliente;
  }

  registrarReserva(reserva: any) {
    if (this.cliente != undefined) {
      const reservacion = this.construirReserva(reserva);
      this.reservaService.createReserva(reservacion).then((data) => {
        this.dialogRef.close();
      });
    } else {
      this.alertaService.error('Escoja un cliente');
    }
  }
  construirReserva(reserva: any) {
    return {
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
      numberOfAdults: reserva.adultos ? reserva.adultos : 0,
      numberOfChilds: reserva.niños ? reserva.niños : 0,
    };
  }
  eliminarReserva(idReserva: number) {
    this.reservaService.eliminarReservation(idReserva).then((data) => {
      this.dialogRef.close();
    });
  }
  modificarReserva(reserva: any) {
    this.reservaService
      .modificarReservacion(this.construirReserva(reserva), reserva.id)
      .then((data) => {
        this.dialogRef.close();
      });
  }
}
