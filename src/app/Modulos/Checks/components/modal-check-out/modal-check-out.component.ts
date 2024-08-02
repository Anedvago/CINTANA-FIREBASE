import { TitleCasePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-modal-check-out',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    ReactiveFormsModule,
    TitleCasePipe,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './modal-check-out.component.html',
  styleUrl: './modal-check-out.component.css',
})
export class ModalCheckOutComponent implements OnInit {
  estados = ['BUENO', 'MALO'];
  formulario!: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ModalCheckOutComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    this.inicializarFormulario();
  }
  inicializarFormulario() {
    this.formulario = this.fb.group({
      llaves: ['BUENO'],
      cargoLlaves: [0],
      colchon: ['BUENO'],
      cargoColchon: [0],
      sabanas: ['BUENO'],
      cargoSabanas: [0],
      almohadas: ['BUENO'],
      cargoAlmohadas: [0],
      bombillos: ['BUENO'],
      cargoBombillos: [0],
      toallas: ['BUENO'],
      cargoToallas: [0],
      ventiladores: ['BUENO'],
      cargoVentiladores: [0],
      cargos: ['BUENO'],
      cargoCargos: [0],
    });
  }
  checkOut() {
    const cargos = [
      this.formulario.get('cargoLlaves')!.value,
      this.formulario.get('cargoColchon')!.value,
      this.formulario.get('cargoSabanas')!.value,
      this.formulario.get('cargoAlmohadas')!.value,
      this.formulario.get('cargoBombillos')!.value,
      this.formulario.get('cargoToallas')!.value,
      this.formulario.get('cargoVentiladores')!.value,
      this.formulario.get('cargoCargos')!.value,
    ];

    const cadenaCargos = cargos.join('-');

    const url = `./#/billing/${this.data}/${cadenaCargos}`;
    window.open(url, '_blank');
    //this.dialogRef.close();
  }
}
