import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ClienteService } from '../../Servicios/cliente.service';
import { TitleCasePipe } from '@angular/common';
import { AlertaService } from '../../Servicios/alerta.service';

@Component({
  selector: 'app-formulario-buscar-cliente',
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
  templateUrl: './formulario-buscar-cliente.component.html',
  styleUrl: './formulario-buscar-cliente.component.css',
})
export class FormularioBuscarClienteComponent implements OnInit {
  formulario!: FormGroup;
  clientes: any;
  @Input() cliente: any;
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
    private alertaService: AlertaService
  ) {}

  ngOnInit(): void {
    if (this.cliente != undefined) {
      this.clientes = [this.cliente];
      this.inicializarFormularioConCliente();
    } else {
      this.inicializarFormulario();
    }
  }

  inicializarFormulario() {
    this.formulario = this.fb.group({
      tipoIdentificacion: ['CC'],
      identificacion: [],
      nombre: [],
      telefono: [],
    });
  }
  inicializarFormularioConCliente() {
    this.formulario = this.fb.group({
      tipoIdentificacion: [this.cliente.typeIdentification],
      identificacion: [this.cliente.identification],
      nombre: [this.cliente.name],
      telefono: [this.cliente.phone],
    });
  }

  getCliente() {
    this.clienteService
      .getClientePorIdentificacion(
        this.formulario.get('tipoIdentificacion')!.value,
        this.formulario.get('identificacion')!.value
      )
      .then((data) => {
        this.clientes = data;
        if (data!.length > 0) {
          this.formulario.patchValue({
            nombre: this.clientes[0].name,
            telefono: this.clientes[0].phone,
          });
          this.clienteObtenido.emit(this.clientes[0]);
        } else {
          this.formulario.patchValue({
            nombre: '',
            telefono: '',
          });
        }
      });
  }
  crearCliente() {
    this.clienteService
      .crearCliente(
        this.formulario.get('tipoIdentificacion')!.value,
        this.formulario.get('identificacion')!.value,
        this.formulario.get('nombre')!.value,
        this.formulario.get('telefono')!.value
      )
      .then((data) => {
        this.clientes = data;
        this.clienteObtenido.emit(this.clientes[0]);
        this.alertaService.exito('¡Cliente creado!');
      });
  }
}
