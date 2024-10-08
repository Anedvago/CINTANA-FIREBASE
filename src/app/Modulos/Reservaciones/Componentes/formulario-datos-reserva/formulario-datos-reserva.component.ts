import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HabitacionService } from '../../../../Servicios/habitacion.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { AlertaService } from '../../../../Servicios/alerta.service';
import { ConfiguracionService } from '../../../../Servicios/configuracion.service';

@Component({
  selector: 'app-formulario-datos-reserva',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './formulario-datos-reserva.component.html',
  styleUrl: './formulario-datos-reserva.component.css',
})
export class FormularioDatosReservaComponent implements OnInit {
  habitaciones: any[] = [];
  formularioReserva!: FormGroup;
  formularioPago!: FormGroup;
  valorNocheAdultos: number = 0;
  valorNocheNiños: number = 0;
  @Input() reserva: any;
  public tiposDePago = ['EFECTIVO', 'TRANSFERENCIA', 'DATAFONO'];
  @Output() registraReserva = new EventEmitter<any>();
  @Output() eliminaReserva = new EventEmitter<any>();
  @Output() modificaReserva = new EventEmitter<any>();
  @Output() clickCheckIn = new EventEmitter<any>();
  constructor(
    private habitacionService: HabitacionService,
    private fb: FormBuilder,
    private alertaService: AlertaService,
    private configService: ConfiguracionService
  ) {}
  ngOnInit(): void {
    this.obtenerHabitaciones();
    this.obtenerParametros();
    if (this.reserva != undefined) {
      this.inicializarFormularioConReserva();
    } else {
      this.inicializarFormulario();
    }
  }
  obtenerParametros() {
    this.configService
      .getParametroPorNombre('VALOR DE LA NOCHE PARA NIÑOS')
      .then((data: any) => {
        this.valorNocheNiños = data[0].valor;
      });
    this.configService
      .getParametroPorNombre('VALOR DE LA NOCHE PARA ADULTOS')
      .then((data: any) => {
        this.valorNocheAdultos = data[0].valor;
      });
  }
  obtenerHabitaciones() {
    this.habitacionService.getHabitaciones().then((data) => {
      this.habitaciones = data!;
    });
  }
  inicializarFormulario() {
    this.formularioReserva = this.fb.group({
      fechaInicial: ['', Validators.required],
      horaEntrada: ['12:00', Validators.required],
      fechaFinal: ['', Validators.required],
      horaSalida: ['11:00', Validators.required],
      adultos: [],
      niños: [],
      habitacion: [, Validators.required],
    });
    this.formularioPago = this.fb.group({
      metodoDePago: ['EFECTIVO', Validators.required],
      totalAPagar: [],
      totalCancelado: [],
    });
  }

  inicializarFormularioConReserva() {
    this.formularioReserva = this.fb.group({
      fechaInicial: [this.reserva.start, Validators.required],
      horaEntrada: [
        this.reserva.start.slice(-8).slice(0, 5),
        Validators.required,
      ],
      fechaFinal: [this.reserva.end, Validators.required],
      horaSalida: [this.reserva.end.slice(-8).slice(0, 5), Validators.required],
      adultos: [this.reserva.numberOfAdults],
      niños: [this.reserva.numberOfChilds],
      habitacion: [this.reserva.room, Validators.required],
    });
    this.formularioPago = this.fb.group({
      metodoDePago: [this.reserva.wayToPay, Validators.required],
      totalAPagar: [this.reserva.total],
      totalCancelado: [this.reserva.paid],
    });
  }

  calcularTotalAPagar() {
    const adultos = this.formularioReserva.get('adultos')!.value;
    const niños = this.formularioReserva.get('niños')!.value;
    const metodoDePago =
      this.formularioPago.get('metodoDePago')!.value == 'DATAFONO';
    let total = 0;
    const totalCancelado = this.formularioPago.get('totalCancelado')!.value;
    const dias = this.calcularDiasDeDiferencia();
    if (
      dias != undefined &&
      dias > 0 &&
      metodoDePago != undefined &&
      metodoDePago != null &&
      ((adultos != undefined && adultos > 0) ||
        (niños != undefined && niños > 0))
    ) {
      total =
        dias *
        (this.valorNocheAdultos * adultos + this.valorNocheNiños * niños); //aqui obtener el valor desde configuracion
      if (metodoDePago) {
        total = total * 1.05;
      }
      this.formularioPago.get('totalAPagar')!.setValue(total);
      if (totalCancelado == 0 || totalCancelado == undefined) {
        this.formularioPago.get('totalCancelado')!.setValue(total / 2);
      }
    }
  }

  calcularDiasDeDiferencia() {
    const fechaInicial = new Date(
      this.formularioReserva.get('fechaInicial')!.value
    );
    const fechaFinal = new Date(
      this.formularioReserva.get('fechaFinal')!.value
    );
    fechaInicial.setHours(0, 0);
    fechaFinal.setHours(0, 0);
    const miliSeconds = Math.abs(Number(fechaFinal) - Number(fechaInicial));
    const dias = miliSeconds / 86400000;
    return dias;
  }

  registrarReserva() {
    const adultos = this.formularioReserva.get('adultos')!.value;
    const niños = this.formularioReserva.get('niños')!.value;
    if (
      this.formularioReserva.valid &&
      (adultos > 0 || niños > 0) &&
      this.formularioPago.valid
    ) {
      this.registraReserva.emit({
        fechaInicial: this.formularioReserva.get('fechaInicial')!.value,
        horaEntrada: this.formularioReserva.get('horaEntrada')!.value,
        fechaFinal: this.formularioReserva.get('fechaFinal')!.value,
        horaSalida: this.formularioReserva.get('horaSalida')!.value,
        adultos: adultos,
        niños: niños,
        habitacion: this.formularioReserva.get('habitacion')!.value,
        metodoDePago: this.formularioPago.get('metodoDePago')!.value,
        totalAPagar: this.formularioPago.get('totalAPagar')!.value,
        totalCancelado: this.formularioPago.get('totalCancelado')!.value,
      });
    } else {
      this.alertaService.error('Formulario invalido');
    }
  }
  eliminarReserva() {
    this.eliminaReserva.emit(this.reserva.id);
  }
  modificarReserva() {
    const adultos = this.formularioReserva.get('adultos')!.value;
    const niños = this.formularioReserva.get('niños')!.value;
    if (
      this.formularioReserva.valid &&
      (adultos > 0 || niños > 0) &&
      this.formularioPago.valid
    ) {
      this.modificaReserva.emit({
        fechaInicial: this.formularioReserva.get('fechaInicial')!.value,
        horaEntrada: this.formularioReserva.get('horaEntrada')!.value,
        fechaFinal: this.formularioReserva.get('fechaFinal')!.value,
        horaSalida: this.formularioReserva.get('horaSalida')!.value,
        adultos: adultos,
        niños: niños,
        habitacion: this.formularioReserva.get('habitacion')!.value,
        metodoDePago: this.formularioPago.get('metodoDePago')!.value,
        totalAPagar: this.formularioPago.get('totalAPagar')!.value,
        totalCancelado: this.formularioPago.get('totalCancelado')!.value,
        id: this.reserva.id,
      });
    } else {
      this.alertaService.error('Formulario invalido');
    }
  }
  realizarCheckIn() {
    this.clickCheckIn.emit(this.reserva.id);
  }
}
