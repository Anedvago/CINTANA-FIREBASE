import { Component, inject, OnInit } from '@angular/core';
import { LayoutService } from '../../../../Servicios/layout.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalCrearPasadiaComponent } from '../../componentes/modal-crear-pasadia/modal-crear-pasadia.component';
import { PasadiaService } from '../../../../Servicios/pasadia.service';
import { AlertaService } from '../../../../Servicios/alerta.service';
@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [
    FullCalendarModule,
    MatButtonModule,
    NgClass,
    MatIcon,
    MatDialogModule,
  ],
  templateUrl: './calendario.component.html',
  styleUrl: './calendario.component.css',
})
export class CalendarioComponent implements OnInit {
  esMovil: boolean = this.layoutservice.esMovil;
  esTablet: boolean = this.layoutservice.esTablet;
  calendarOptions: CalendarOptions = {
    initialView: this.esMovil ? 'timeGridDay' : 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin],
    eventClick: this.modificarPasadia.bind(this),
    headerToolbar: {
      start: this.esMovil ? '' : 'dayGridMonth,timeGridWeek,timeGridDay,today',
      center: 'title',
      end: 'prevYear,prev,next,nextYear',
    },
    nowIndicator: true,
    displayEventEnd: true,
    displayEventTime: false,
  };
  readonly dialog = inject(MatDialog);
  pasadias: any[] = [];
  constructor(
    private layoutservice: LayoutService,
    private pasadiaService: PasadiaService
  ) {}
  ngOnInit(): void {
    this.obtenerPasadias();
  }
  regitrarPasadia() {
    this.dialog.open(ModalCrearPasadiaComponent);
  }
  modificarPasadia(pasadia: any) {
    this.dialog.open(ModalCrearPasadiaComponent, {
      data: this.pasadias.filter((elem) => elem.id == pasadia.event.id)[0],
    });
  }

  obtenerPasadias() {
    this.pasadiaService.obtenerPasadias().subscribe((data: any) => {
      this.pasadias = data;
      this.calendarOptions.events = data!.map((element: any) => {
        return {
          id: element.id,
          date: element.fecha,
          title: element.Customers.name,
          cliente: element.cliente,
        };
      });
    });
  }
}
