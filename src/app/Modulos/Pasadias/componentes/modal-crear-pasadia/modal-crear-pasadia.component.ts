import { Component, Inject, model, OnInit } from '@angular/core';
import { FormularioBuscarClienteComponent } from '../../../../Components/formulario-buscar-cliente/formulario-buscar-cliente.component';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FechaService } from '../../../../Servicios/fecha.service';
import { AlertaService } from '../../../../Servicios/alerta.service';
import { PasadiaService } from '../../../../Servicios/pasadia.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ConfiguracionService } from '../../../../Servicios/configuracion.service';
import { TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-crear-pasadia',
  standalone: true,
  imports: [
    FormularioBuscarClienteComponent,
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    TitleCasePipe,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './modal-crear-pasadia.component.html',
  styleUrl: './modal-crear-pasadia.component.css',
})
export class ModalCrearPasadiaComponent implements OnInit {
  fechaSeleccionada = model<Date | null>(new Date());
  cliente: any;
  pasadia: any;
  tarifas: any[] = [];
  valorTarifaSeleccionada: number = 0;
  constructor(
    private fechaService: FechaService,
    private alertaService: AlertaService,
    private pasadiaService: PasadiaService,
    private configService: ConfiguracionService,
    public dialogRef: MatDialogRef<ModalCrearPasadiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.obtenerParametros();
    if (this.data) {
      this.pasadia = this.data;
      this.cliente = this.data.Customers;
      this.fechaSeleccionada.set(new Date(this.pasadia.fecha));
      this.valorTarifaSeleccionada = this.data.total.toString();
    }
  }

  obtenerCliente(cliente: any) {
    this.cliente = cliente;
  }

  registrarPasadia() {
    if (
      this.cliente != undefined &&
      this.fechaSeleccionada != null &&
      this.valorTarifaSeleccionada != 0
    ) {
      this.pasadiaService
        .crearPasadia(
          this.cliente.id,
          this.fechaService.convertirFecha(
            this.fechaSeleccionada()!.toString()
          ),
          this.valorTarifaSeleccionada
        )
        .then((data) => {
          this.dialogRef.close();
        });
    } else {
      this.alertaService.error('Diligencie el formulario correctamente');
    }
  }
  modificarPasadia() {
    this.pasadiaService
      .actualizarPasadia(
        this.cliente.id,
        this.fechaService.convertirFecha(this.fechaSeleccionada()!.toString()),
        this.valorTarifaSeleccionada,
        this.pasadia.id
      )
      .then((data) => {
        this.dialogRef.close();
      });
  }
  eliminarPasadia() {
    this.pasadiaService.eliminarPasadia(this.pasadia.id).then((data) => {
      this.dialogRef.close();
    });
  }
  obtenerParametros() {
    this.configService
      .getParametroPorNombres(
        'VALOR DEL PASADIA SIN ALMUERZO',
        'VALOR DEL PASADIA CON ALMUERZO'
      )
      .then((data: any) => {
        this.tarifas = data;
      });
  }
}
