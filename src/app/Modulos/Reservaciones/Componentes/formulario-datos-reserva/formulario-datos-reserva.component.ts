import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  public tiposDePago = ['EFECTIVO', 'TRANSFERENCIA', 'DATAFONO'];
  @Output() registraReserva = new EventEmitter<any>();
  constructor(
    private habitacionService: HabitacionService,
    private fb: FormBuilder,
    private alertaService: AlertaService
  ) {}
  ngOnInit(): void {
    this.obtenerHabitaciones();
    this.inicializarFormulario();
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
      console.log('Dias a cobrar = ' + dias);
      total = dias * (80000 * adultos + 40000 * niños);
      console.log('Metodo = ' + this.formularioPago.get('metodoDePago')!.value);

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
}
