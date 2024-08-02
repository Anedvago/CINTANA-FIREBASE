import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CategoriaService } from '../../../../Servicios/categoria.service';
import { ArticuloService } from '../../../../Servicios/articulo.service';
import { AlertaService } from '../../../../Servicios/alerta.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TitleCasePipe } from '@angular/common';
import { ServicioService } from '../../../../Servicios/servicio.service';

@Component({
  selector: 'app-modal-nuevo-servicio',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    TitleCasePipe,
  ],
  templateUrl: './modal-nuevo-servicio.component.html',
  styleUrl: './modal-nuevo-servicio.component.css',
})
export class ModalNuevoServicioComponent implements OnInit {
  formulario!: FormGroup;
  departamentos: any[] = [];
  departamentosFiltrados: any[] = [];
  secciones: any[] = [];
  seccionesFiltradas: any[] = [];
  familias: any[] = [];
  familiasFiltradas: any[] = [];
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private servicioService: ServicioService,
    /* private artiuloService: ArticuloService, */
    private alertaService: AlertaService,
    public dialogRef: MatDialogRef<ModalNuevoServicioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    if (this.data != undefined) {
      this.inicializarFormularioConArticulo();
    } else {
      this.inicializarFormulario();
    }

    this.getDepartamentos();
    this.getSecciones();
    this.getFamilias();
  }
  inicializarFormulario() {
    this.formulario = this.fb.group({
      codigo: [''],
      /* referencia: [], */
      nombre: [],
      precio: [],
      /*  stock: [], */
      departamento: [],
      seccion: [],
      familia: [],
    });
    this.formulario.get('codigo')?.disable();
  }
  inicializarFormularioConArticulo() {
    this.formulario = this.fb.group({
      codigo: [this.data.id],
      /*  referencia: [this.data.ref], */
      nombre: [this.data.name],
      precio: [this.data.value],
      /*  stock: [this.data.stock], */
      departamento: [this.data.dpto],
      seccion: [this.data.section],
      familia: [this.data.family],
    });
    this.formulario.get('codigo')?.disable();
  }
  getDepartamentos() {
    this.categoriaService.getDepartametosDeServicios().then((data) => {
      this.departamentos = data!;
      this.departamentosFiltrados = data!;
    });
  }
  getSecciones() {
    this.categoriaService.getSeccionesDeServicios().then((data) => {
      this.secciones = data!;
      this.seccionesFiltradas = data!;
    });
  }
  getFamilias() {
    this.categoriaService.getFamiliasDeServicios().then((data) => {
      this.familias = data!;
      this.familiasFiltradas = data!;
    });
  }
  filtrarPorDepartamento() {
    const departamento = this.formulario.get('departamento')!.value;
    let seccionesId: any[] = [];
    this.seccionesFiltradas = this.secciones.filter(
      (elem) => elem.departament == departamento
    );
    seccionesId = this.seccionesFiltradas.map((elem) => elem.id);

    this.familiasFiltradas = this.familias.filter((elem) =>
      seccionesId.includes(elem.section)
    );
  }
  filtrarPorSeccion() {
    const seccion = this.formulario.get('seccion')!.value;
    const departamento = this.secciones.filter((elem) => elem.id == seccion)[0]
      .departament;
    this.formulario.get('departamento')!.setValue(departamento);
    this.seccionesFiltradas = this.secciones.filter(
      (elem) => elem.departament == departamento
    );
    this.familiasFiltradas = this.familias.filter(
      (elem) => elem.section == seccion
    );
  }
  filtrarPorFamilia() {
    const familia = this.formulario.get('familia')!.value;
    const seccion = this.familias.filter((elem) => elem.id == familia)[0]
      .section;
    const departamento = this.secciones.filter((elem) => elem.id == seccion)[0]
      .departament;
    this.formulario.get('departamento')!.setValue(departamento);
    this.formulario.get('seccion')!.setValue(seccion);
    this.seccionesFiltradas = this.secciones.filter(
      (elem) => elem.departament == departamento
    );
    this.familiasFiltradas = this.familias.filter(
      (elem) => elem.section == seccion
    );
  }

  crearServicio() {
    if (this.formulario.valid) {
      this.servicioService
        .crearServicio(this.construirServicio())
        .then((data: any) => {
          this.dialogRef.close(data[0]);
        });
    } else {
      this.alertaService.error('Formulario invalido');
    }
  }

  actualizarServicio() {
    if (this.formulario.valid) {
      this.servicioService
        .actualizarServicio(this.construirServicioParaActualizar())
        .then((data: any) => {
          this.dialogRef.close(data[0]);
        });
    } else {
      this.alertaService.error('Formulario invalido');
    }
  }

  eliminarServicio() {
    this.servicioService.eliminarServicio(this.data.id).then((data) => {
      this.dialogRef.close(this.data);
    });
  }

  construirServicio() {
    return {
      /*   ref: this.formulario.get('referencia')!.value.toUpperCase(), */
      name: this.formulario.get('nombre')!.value.toUpperCase(),
      value: this.formulario.get('precio')!.value,
      /* stock: this.formulario.get('stock')!.value, */
      dpto: this.formulario.get('departamento')!.value,
      section: this.formulario.get('seccion')!.value,
      family: this.formulario.get('familia')!.value,
    };
  }
  construirServicioParaActualizar() {
    return {
      id: this.data.id,
      /*  ref: this.formulario.get('referencia')!.value.toUpperCase(), */
      name: this.formulario.get('nombre')!.value.toUpperCase(),
      value: this.formulario.get('precio')!.value,
      /*   stock: this.formulario.get('stock')!.value, */
      dpto: this.formulario.get('departamento')!.value,
      section: this.formulario.get('seccion')!.value,
      family: this.formulario.get('familia')!.value,
    };
  }
}
