import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { LayoutService } from '../../../../Servicios/layout.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoriaService } from '../../../../Servicios/categoria.service';
import { ArbolCategoriaComponent } from '../../Components/arbol-categoria/arbol-categoria.component';
import { MatDialog } from '@angular/material/dialog';
import { ModalNuevaCategoriaComponent } from '../../Components/modal-nueva-categoria/modal-nueva-categoria.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [NgClass, MatButtonModule, MatIconModule, ArbolCategoriaComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.css',
})
export class CategoriasComponent {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  categoriasDeArticulos: any[] = [];
  categoriasDeServicios: any[] = [];
  readonly dialog = inject(MatDialog);
  constructor(
    private layoutService: LayoutService,
    private categoriaService: CategoriaService
  ) {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getCategoriasDeArticulos().then((data) => {
      this.categoriasDeArticulos = data!;
    });
    this.categoriaService.getCategoriasDeServicios().then((data) => {
      this.categoriasDeServicios = data!;
    });
  }

  crearCategoria() {
    const dialogRef = this.dialog.open(ModalNuevaCategoriaComponent);

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategorias();
    });
  }

  construirCategoriaDeArticulos(categoria: any) {
    switch (categoria.level) {
      case 0:
        categoria = {
          ...categoria,
          profundidad: 'DEPARTAMENTO',
          ...this.categoriasDeArticulos.filter(
            (elem) => elem?.id == categoria.id
          )[0],
        };
        break;
      case 1:
        categoria = {
          ...categoria,
          profundidad: 'SECCION',
          ...this.categoriasDeArticulos
            .flatMap((data) => data?.children)
            .filter((elem) => elem?.id == categoria.id)[0],
        };
        break;
      case 2:
        categoria = {
          ...categoria,
          profundidad: 'FAMILIA',
          ...this.categoriasDeArticulos
            .flatMap((data) => data?.children)
            .flatMap((data) => data?.children)
            .filter((elem) => elem?.id == categoria.id)[0],
        };
        break;
    }

    return categoria;
  }
  construirCategoriaDeServicios(categoria: any) {
    switch (categoria.level) {
      case 0:
        categoria = {
          ...categoria,
          profundidad: 'DEPARTAMENTO',
          ...this.categoriasDeServicios.filter(
            (elem) => elem?.id == categoria.id
          )[0],
        };
        break;
      case 1:
        categoria = {
          ...categoria,
          profundidad: 'SECCION',
          ...this.categoriasDeServicios
            .flatMap((data) => data?.children)
            .filter((elem) => elem?.id == categoria.id)[0],
        };
        break;
      case 2:
        categoria = {
          ...categoria,
          profundidad: 'FAMILIA',
          ...this.categoriasDeServicios
            .flatMap((data) => data?.children)
            .flatMap((data) => data?.children)
            .filter((elem) => elem?.id == categoria.id)[0],
        };
        break;
    }

    return categoria;
  }
  eliminarCategoriaDeArticulos(categoria: any) {
    categoria = this.construirCategoriaDeArticulos(categoria);
    const dialogRef = this.dialog.open(ModalNuevaCategoriaComponent, {
      data: { categoria: categoria, operacion: 'ELIMINAR' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategorias();
    });
  }
  modificarCategoriaDeArticulos(categoria: any) {
    categoria = this.construirCategoriaDeArticulos(categoria);
    const dialogRef = this.dialog.open(ModalNuevaCategoriaComponent, {
      data: { categoria: categoria, operacion: 'EDITAR' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategorias();
    });
  }
  eliminarCategoriaDeServicios(categoria: any) {
    categoria = this.construirCategoriaDeServicios(categoria);
    const dialogRef = this.dialog.open(ModalNuevaCategoriaComponent, {
      data: { categoria: categoria, operacion: 'ELIMINAR' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategorias();
    });
  }
  modificarCategoriaDeServicios(categoria: any) {
    categoria = this.construirCategoriaDeServicios(categoria);
    const dialogRef = this.dialog.open(ModalNuevaCategoriaComponent, {
      data: { categoria: categoria, operacion: 'EDITAR' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.getCategorias();
    });
  }
}
