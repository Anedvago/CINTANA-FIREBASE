import { NgClass, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [TitleCasePipe, MatButtonModule, NgClass],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  public botones = [
    { nombre: 'inicio', activo: true, ruta: 'admin', desplegable: false },
    {
      nombre: 'inventario',
      activo: false,
      ruta: 'inventarios',
      desplegable: true,
      botones: [
        { nombre: 'Articulos', activo: false, ruta: 'inventory/articles' },
        { nombre: 'Servicios', activo: false, ruta: 'inventory/services' },
        { nombre: 'Categorias', activo: false, ruta: 'inventory/categories' },
        { nombre: 'Compras', activo: false, ruta: 'inventory/purchases' },
        { nombre: 'Bajas', activo: false, ruta: 'inventory/discharges' },
      ],
    },
    {
      nombre: 'reservaciones',
      activo: false,
      ruta: 'reservations',
      desplegable: true,
      botones: [
        { nombre: 'Habitaciones', activo: false, ruta: 'reservations/rooms' },
        { nombre: 'Checks', activo: false, ruta: 'reservations/checks' },
      ],
    },
    {
      nombre: 'punto de venta',
      activo: false,
      ruta: 'sales',
      desplegable: false,
    },
    { nombre: 'Cerrar Sesión', activo: false, ruta: '', desplegable: false },
  ];

  constructor(private router: Router) {}

  public tabClicked(index: number): void {
    const indexActive = this.buscarActivo(this.botones);
    this.botones[indexActive].activo = false;
    this.botones[index].activo = true;
    this.router.navigate([`${this.botones[index].ruta}`]);
  }

  public buscarActivo(list: any[]): number {
    const index = list.findIndex((elem) => {
      return elem.activo == true;
    });
    return index;
  }

  logOut() {
    this.router.navigate(['../login']).then(() => {
      // Después de la redirección, recargar la página
      location.reload();
    });
  }
}
