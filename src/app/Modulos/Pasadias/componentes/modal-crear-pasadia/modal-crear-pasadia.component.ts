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

@Component({
  selector: 'app-modal-crear-pasadia',
  standalone: true,
  imports: [
    FormularioBuscarClienteComponent,
    MatCardModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './modal-crear-pasadia.component.html',
  styleUrl: './modal-crear-pasadia.component.css',
})
export class ModalCrearPasadiaComponent implements OnInit {
  fechaSeleccionada = model<Date | null>(new Date());
  cliente: any;
  pasadia: any;
  constructor(
    private fechaService: FechaService,
    private alertaService: AlertaService,
    private pasadiaService: PasadiaService,
    public dialogRef: MatDialogRef<ModalCrearPasadiaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    if (this.data) {
      this.pasadia = this.data;
      this.cliente = this.data.Customers;
      this.fechaSeleccionada.set(new Date(this.pasadia.fecha));
    }
  }

  obtenerCliente(cliente: any) {
    this.cliente = cliente;
  }

  registrarPasadia() {
    if (this.cliente != undefined && this.fechaSeleccionada != null) {
      this.pasadiaService
        .crearPasadia(
          this.cliente.id,
          this.fechaService.convertirFecha(this.fechaSeleccionada()!.toString())
        )
        .then((data) => {
          this.dialogRef.close();
        });
    } else {
      this.alertaService.error('Diligencie el formulario correctamente');
    }
  }
  modificarPasadia() {
    console.log(this.cliente.id, this.pasadia.fecha, this.pasadia.id);

    this.pasadiaService
      .actualizarPasadia(
        this.cliente.id,
        this.fechaService.convertirFecha(this.fechaSeleccionada()!.toString()),
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
}
