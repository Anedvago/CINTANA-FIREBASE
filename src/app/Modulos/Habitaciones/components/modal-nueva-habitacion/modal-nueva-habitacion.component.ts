import { TitleCasePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HabitacionService } from '../../../../Servicios/habitacion.service';

@Component({
  selector: 'app-modal-nueva-habitacion',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    TitleCasePipe,
    MatIconModule,
  ],
  templateUrl: './modal-nueva-habitacion.component.html',
  styleUrl: './modal-nueva-habitacion.component.css',
})
export class ModalNuevaHabitacionComponent implements OnInit {
  tiposHabitaciones = ['HABITACIÓN', 'CABAÑA'];
  formulario!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ModalNuevaHabitacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private habitacionService: HabitacionService
  ) {}
  ngOnInit(): void {
    this.inicializarFromulario();
    if (this.data != undefined) {
      this.cargarDatosAlformulario();
    }
  }
  inicializarFromulario() {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      tipo: [null, Validators.required],
      color: [null, Validators.required],
    });
  }
  cargarDatosAlformulario() {
    console.log(this.data);

    this.formulario.patchValue({
      nombre: this.data.name.toUpperCase(),
      tipo: this.data.type.toUpperCase(),
      color: this.data.color.toUpperCase(),
    });
  }
  crearHabitacion() {
    this.habitacionService
      .crearHabitacion({
        name: this.formulario.get('nombre')!.value.toUpperCase(),
        type: this.formulario.get('tipo')!.value,
        color: this.formulario.get('color')!.value,
      })
      .then((data) => {
        this.dialogRef.close();
      });
  }

  modificarHabitacion() {
    this.habitacionService
      .actualizarHabitacion({
        id: this.data.id,
        name: this.formulario.get('nombre')!.value.toUpperCase(),
        type: this.formulario.get('tipo')!.value,
        color: this.formulario.get('color')!.value,
      })
      .then((data) => {
        this.dialogRef.close();
      });
  }
  eliminarHabitacion() {
    this.habitacionService.borrarHabitacion(this.data.id).then((data) => {
      this.dialogRef.close();
    });
  }
}
