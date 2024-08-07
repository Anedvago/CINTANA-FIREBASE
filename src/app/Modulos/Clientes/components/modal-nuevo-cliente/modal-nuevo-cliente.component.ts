import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClienteService } from '../../../../Servicios/cliente.service';
import { AlertaService } from '../../../../Servicios/alerta.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TitleCasePipe } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-nuevo-cliente',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './modal-nuevo-cliente.component.html',
  styleUrl: './modal-nuevo-cliente.component.css',
})
export class ModalNuevoClienteComponent implements OnInit {
  formulario!: FormGroup;
  cliente: any;
  @Output() clienteObtenido = new EventEmitter<any>();
  public tiposDeIdentificacion = [
    { nombre: 'CÉDULA DE CIUDADANÍA', valor: 'CC' },
    { nombre: 'TARJETA DE IDENTIDAD', valor: 'TI' },
    { nombre: 'CÉDULA DE EXTRANJERÍA', valor: 'CE' },
    { nombre: 'PASAPORTE', valor: 'PA' },
  ];
  constructor(
    private fb: FormBuilder,
    private clienteService: ClienteService,
    private alertaService: AlertaService,
    public dialogRef: MatDialogRef<ModalNuevoClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
    if (this.data != undefined) {
      this.cliente = this.data;
      this.inicializarFormularioConCliente();
    }
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      tipoIdentificacion: ['CC', Validators.required],
      identificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      correo: ['', Validators.required],
    });
  }
  inicializarFormularioConCliente() {
    this.formulario = this.fb.group({
      tipoIdentificacion: [
        this.cliente.typeIdentification,
        Validators.required,
      ],
      identificacion: [this.cliente.identification, Validators.required],
      nombre: [this.cliente.name, Validators.required],
      telefono: [this.cliente.phone, Validators.required],
      correo: [this.cliente.email, Validators.required],
    });
  }

  modificarCliente() {
    const cliente = {
      id: this.cliente.id,
      typeIdentification: this.formulario.get('tipoIdentificacion')!.value,
      identification: this.formulario.get('identificacion')!.value,
      name: this.formulario.get('nombre')!.value.toUpperCase(),
      phone: this.formulario.get('telefono')!.value,
      email: this.formulario.get('correo')!.value.toLowerCase(),
    };
    this.clienteService.actualizarCliente(cliente).then((data) => {
      this.dialogRef.close('MODIFICADO');
    });
  }
  eliminarCliente() {
    this.clienteService.eliminarCliente(this.cliente.id).then((data) => {
      this.dialogRef.close('ELIMINADO');
    });
  }
  crearCliente() {
    this.clienteService
      .crearCliente(
        this.formulario.get('tipoIdentificacion')!.value,
        this.formulario.get('identificacion')!.value,
        this.formulario.get('nombre')!.value.toUpperCase(),
        this.formulario.get('telefono')!.value,
        this.formulario.get('correo')!.value.toLowerCase()
      )
      .then((data) => {
        this.dialogRef.close('CREADO');
      });
  }
}
