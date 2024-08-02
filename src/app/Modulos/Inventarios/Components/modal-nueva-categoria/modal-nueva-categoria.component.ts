import { TitleCasePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CategoriaService } from '../../../../Servicios/categoria.service';

@Component({
  selector: 'app-modal-nueva-categoria',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    TitleCasePipe,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-nueva-categoria.component.html',
  styleUrl: './modal-nueva-categoria.component.css',
})
export class ModalNuevaCategoriaComponent implements OnInit {
  tiposCategoria = ['ARTICULOS', 'SERVICIOS'];
  profundidades = ['DEPARTAMENTO', 'SECCION', 'FAMILIA'];
  departamentos: any[] = [];
  secciones: any[] = [];
  seccionesFiltradas: any[] = [];
  formulario!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ModalNuevaCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private categoriaService: CategoriaService
  ) {}
  ngOnInit(): void {
    this.inicializarFormulario();
    if (this.data) {
      this.inicializarConCategoria(this.data.categoria);
    }
  }
  inicializarFormulario() {
    this.formulario = this.fb.group({
      tipo: [],
      profundidad: [],
      departamento: [],
      seccion: [],
      nombre: [],
    });
    this.formulario.get('profundidad')?.disable();
    this.formulario.get('departamento')?.disable();
    this.formulario.get('seccion')?.disable();
    this.formulario.get('nombre')?.disable();
  }
  inicializarConCategoria(categoria: any) {
    this.formulario.patchValue({
      tipo: categoria.type == 'A' ? 'ARTICULOS' : 'SERVICIOS',
    });
    this.establecerTipo();
    this.formulario.patchValue({
      profundidad: categoria.profundidad,
    });
    this.establecerProfundidad();
    this.formulario.patchValue({
      departamento: categoria.departament,
    });
    this.formulario.patchValue({
      seccion: categoria.section,
    });
    this.formulario.patchValue({
      nombre: categoria.name,
    });
  }
  establecerTipo() {
    this.formulario.get('profundidad')?.enable();
    this.establecerProfundidad();
  }
  establecerProfundidad() {
    this.formulario.patchValue({
      departamento: [],
      seccion: [],
      nombre: [],
    });
    const profundidad = this.formulario.get('profundidad')!.value;
    if (profundidad == 'DEPARTAMENTO') {
      this.formulario.get('departamento')?.disable();
      this.formulario.get('seccion')?.disable();
    }
    if (profundidad == 'SECCION') {
      this.obtenerDepartamentos();
      this.formulario.get('departamento')?.enable();
      this.formulario.get('seccion')?.disable();
    }
    if (profundidad == 'FAMILIA') {
      this.obtenerDepartamentos();
      this.obtenerSecciones();
      this.formulario.get('departamento')?.enable();
      this.formulario.get('seccion')?.enable();
    }
    if (profundidad != undefined) {
      this.formulario.get('nombre')?.enable();
    }
  }
  obtenerDepartamentos() {
    const tipo = this.formulario.get('tipo')!.value;
    if (tipo == 'ARTICULOS') {
      this.categoriaService.getDepartametosDeArticulos().then((data) => {
        this.departamentos = data!;
      });
    } else {
      this.categoriaService.getDepartametosDeServicios().then((data) => {
        this.departamentos = data!;
      });
    }
  }
  obtenerSecciones() {
    const tipo = this.formulario.get('tipo')!.value;
    if (tipo == 'ARTICULOS') {
      this.categoriaService.getSeccionesDeArticulos().then((data) => {
        this.secciones = data!;
        this.seccionesFiltradas = data!;
      });
    } else {
      this.categoriaService.getSeccionesDeServicios().then((data) => {
        this.secciones = data!;
      });
    }
  }

  filtrarPorDepartamento() {
    const departamento = this.formulario.get('departamento')!.value;

    this.seccionesFiltradas = this.secciones.filter(
      (elem) => elem.departament == departamento
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
  }
  crearCategoria() {
    const profundidad = this.formulario.get('profundidad')!.value;
    const tipo = this.formulario.get('tipo')!.value.charAt(0);
    const departamento = this.formulario.get('departamento')!.value;
    const seccion = this.formulario.get('seccion')!.value;
    const nombre = this.formulario.get('nombre')!.value;
    if (profundidad == 'DEPARTAMENTO') {
      this.categoriaService
        .crearDepartamento(tipo, nombre.toUpperCase())
        .then((data) => {
          console.log(data);
          this.dialogRef.close();
        });
    }
    if (profundidad == 'SECCION') {
      this.categoriaService
        .crearSeccion(tipo, departamento, nombre.toUpperCase())
        .then((data) => {
          console.log(data);
          this.dialogRef.close();
        });
    }
    if (profundidad == 'FAMILIA') {
      this.categoriaService
        .crearFamilia(tipo, departamento, seccion, nombre.toUpperCase())
        .then((data) => {
          console.log(data);
          this.dialogRef.close();
        });
    }
  }
  eliminarCategoria() {
    const profundidad = this.formulario.get('profundidad')!.value;
    if (profundidad == 'DEPARTAMENTO') {
      this.categoriaService
        .borrarDepartamento(this.data.categoria.id)
        .then((data) => {
          console.log(data);
          this.dialogRef.close();
        });
    }
    if (profundidad == 'SECCION') {
      this.categoriaService
        .borrarSeccion(this.data.categoria.id)
        .then((data) => {
          console.log(data);
          this.dialogRef.close();
        });
    }
    if (profundidad == 'FAMILIA') {
      this.categoriaService
        .borrarFamilia(this.data.categoria.id)
        .then((data) => {
          console.log(data);
          this.dialogRef.close();
        });
    }
  }
  editarCategoria() {
    const profundidad = this.formulario.get('profundidad')!.value;
    const tipo = this.formulario.get('tipo')!.value.charAt(0);
    const departamento = this.formulario.get('departamento')!.value;
    const seccion = this.formulario.get('seccion')!.value;
    const nombre = this.formulario.get('nombre')!.value;
    if (profundidad == 'DEPARTAMENTO') {
      this.categoriaService
        .actualizarDepartamento(
          this.data.categoria.id,
          tipo,
          nombre.toUpperCase()
        )
        .then((data) => {
          console.log(data);
          this.dialogRef.close();
        });
    }
    if (profundidad == 'SECCION') {
      this.categoriaService
        .actualizarSeccion(
          this.data.categoria.id,
          tipo,
          departamento,
          nombre.toUpperCase()
        )
        .then((data) => {
          console.log(data);
          this.dialogRef.close();
        });
    }
    if (profundidad == 'FAMILIA') {
      this.categoriaService
        .actualizarFamilia(
          this.data.categoria.id,
          tipo,
          departamento,
          seccion,
          nombre.toUpperCase()
        )
        .then((data) => {
          console.log(data);
          this.dialogRef.close();
        });
    }
  }
}
