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
    const dialogRef = this.dialog.open(
      ModalNuevaCategoriaComponent /* , {
      data: { name: this.name(), animal: this.animal() },
    } */
    );

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.animal.set(result);
      }
    }); */
  }
}
