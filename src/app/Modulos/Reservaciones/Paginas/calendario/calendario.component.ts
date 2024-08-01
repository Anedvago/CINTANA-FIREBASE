import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { LayoutService } from '../../../../Servicios/layout.service';
import { NgClass } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalCrearReservaComponent } from '../../Componentes/modal-crear-reserva/modal-crear-reserva.component';
import { ReservaService } from '../../../../Servicios/reserva.service';
import { ClienteService } from '../../../../Servicios/cliente.service';
@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    FullCalendarModule,
    MatButtonModule,
    NgClass,
    MatIconModule,
    MatDialogModule,
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent implements OnInit {
  esMovil: boolean = this.layoutservice.esMovil;
  esTablet: boolean = this.layoutservice.esTablet;
  reservaciones: any[] = [];
  readonly dialog = inject(MatDialog);
  calendarOptions: CalendarOptions = {
    initialView: this.esMovil ? 'timeGridDay' : 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin],
    eventClick: this.modificarReserva.bind(this),
    headerToolbar: {
      start: this.esMovil ? '' : 'dayGridMonth,timeGridWeek,timeGridDay,today',
      center: 'title',
      end: 'prevYear,prev,next,nextYear',
    },
    nowIndicator: true,
    displayEventEnd: true,
    eventTimeFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: true,
    },
  };
  cliente: any;
  constructor(
    private layoutservice: LayoutService,
    private reservaService: ReservaService,
    private clienteService: ClienteService
  ) {}
  ngOnInit(): void {
    this.getReservaciones();
  }
  getReservaciones() {
    this.reservaService.getReservaciones().subscribe((data) => {
      this.reservaciones = this.construirReservaciones(data);
      this.calendarOptions.events = this.reservaciones;
    });
  }
  registrarReserva() {
    this.dialog.open(ModalCrearReservaComponent);
  }
  modificarReserva(reserva: any) {
    this.dialog.open(ModalCrearReservaComponent, {
      data: this.reservaciones.filter((elem) => elem.id == reserva.event.id)[0],
    });
  }
  obtenerClientePorId(idCliente: number) {
    this.clienteService.getClientePorId(idCliente).then((data) => {
      this.cliente = data![0];
      console.log(this.cliente);
    });
  }
  construirReservaciones(datosReserva: any) {
    return datosReserva!.map((elem: any) => {
      return {
        id: elem.id,
        title: `${elem.Customers.name} - ${elem.Rooms.name}`,
        start: elem.start,
        end: elem.end,
        color: elem.Rooms.color,
        customer: elem.Customers,
        numberOfAdults: elem.numberOfAdults,
        numberOfChilds: elem.numberOfChilds,
        room: elem.room,
        wayToPay: elem.wayToPay,
        total: elem.total,
        paid: elem.paid,
      };
    });
  }
}
