import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoriaService } from '../../../../Servicios/categoria.service';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-modal-nuevo-articulo',
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
  templateUrl: './modal-nuevo-articulo.component.html',
  styleUrl: './modal-nuevo-articulo.component.css',
})
export class ModalNuevoArticuloComponent implements OnInit {
  formulario!: FormGroup;
  departamentos: any[] = [];
  departamentosFiltrados: any[] = [];
  secciones: any[] = [];
  seccionesFiltradas: any[] = [];
  familias: any[] = [];
  familiasFiltradas: any[] = [];
  constructor(
    private fb: FormBuilder,
    private categoriaService: CategoriaService
  ) {}
  ngOnInit(): void {
    this.inicializarFormulario();
    this.getDepartamentos();
    this.getSecciones();
    this.getFamilias();
  }
  inicializarFormulario() {
    this.formulario = this.fb.group({
      codigo: [''],
      referencia: [],
      nombre: [],
      precio: [],
      stock: [],
      departamento: [],
      seccion: [],
      familia: [],
    });
    this.formulario.get('codigo')?.disable();
  }
  getDepartamentos() {
    this.categoriaService.getDepartametosDeArticulos().then((data) => {
      this.departamentos = data!;
      this.departamentosFiltrados = data!;
    });
  }
  getSecciones() {
    this.categoriaService.getSeccionesDeArticulos().then((data) => {
      this.secciones = data!;
      this.seccionesFiltradas = data!;
    });
  }
  getFamilias() {
    this.categoriaService.getFamiliasDeArticulos().then((data) => {
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
}
