import { TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClienteService } from '../../../../Servicios/cliente.service';
import { AlertaService } from '../../../../Servicios/alerta.service';
import { ReservaService } from '../../../../Servicios/reserva.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalCrearReservaComponent } from '../../../Reservaciones/Componentes/modal-crear-reserva/modal-crear-reserva.component';
import { ModalCheckOutComponent } from '../../components/modal-check-out/modal-check-out.component';

@Component({
  selector: 'app-checks',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    TitleCasePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './checks.component.html',
  styleUrl: './checks.component.css',
})
export class ChecksComponent implements OnInit {
  formulario!: FormGroup;
  public tiposDeIdentificacion = [
    { nombre: 'CÉDULA DE CIUDADANÍA', valor: 'CC' },
    { nombre: 'TARJETA DE IDENTIDAD', valor: 'TI' },
    { nombre: 'CÉDULA DE EXTRANJERÍA', valor: 'CE' },
    { nombre: 'PASAPORTE', valor: 'PA' },
  ];
  cliente: any;
  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private alertaService: AlertaService,
    private reservaService: ReservaService,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.inicializarFormulario();
  }
  inicializarFormulario() {
    this.formulario = this.fb.group({
      tipo: ['CC'],
      identificacion: [],
    });
  }
  buscarCliente() {
    this.clienteService
      .getClientePorIdentificacion(
        this.formulario.get('tipo')!.value,
        this.formulario.get('identificacion')!.value
      )
      .then((data: any) => {
        if (data != undefined && data.length > 0) {
          this.cliente = data[0];
          this.buscarReservaParaCheckIn();
        } else {
          this.alertaService.error('El cliente no existe');
        }
      });
  }
  buscarReservaParaCheckIn() {
    this.reservaService
      .getReservaParaCheckIn(this.cliente.id)
      .then((data: any) => {
        if (data != undefined && data.length > 0) {
          data[0].customer = this.cliente;
          data[0].checkIn = 'incoming';
          this.dialog.open(ModalCrearReservaComponent, {
            data: data[0],
          });
        } else {
          this.buscarReservaParaCheckOut();
        }
      });
  }
  buscarReservaParaCheckOut() {
    this.reservaService
      .getReservaParaCheckOut(this.cliente.id)
      .then((data: any) => {
        if (data != undefined && data.length > 0) {
          this.dialog.open(ModalCheckOutComponent, { data: this.cliente.id });
        } else {
          this.alertaService.error('El cliente no tiene reservas activas');
        }
      });
  }
}
