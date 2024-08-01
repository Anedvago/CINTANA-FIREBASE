import { Component, inject } from '@angular/core';
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
export class CalendarioComponent {
  esMovil: boolean = this.layoutservice.esMovil;
  esTablet: boolean = this.layoutservice.esTablet;
  readonly dialog = inject(MatDialog);
  calendarOptions: CalendarOptions = {
    initialView: this.esMovil ? 'timeGridDay' : 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin],
    /* eventClick: this.click.bind(this), */
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

  constructor(private layoutservice: LayoutService) {}

  registrarReserva() {
    this.dialog.open(ModalCrearReservaComponent);
  }
}
