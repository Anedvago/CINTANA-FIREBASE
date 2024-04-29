import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LayoutService } from '../../Servicios/layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    RouterOutlet,
    RouterLink,
  ],
})
export class SidebarComponent {
  esMovil: boolean = false;
  esTablet: boolean = false;
  botones = [
    {
      texto: 'Inicio',
      ruta: 'inicio',
    },
    {
      texto: 'Inventarios',
      ruta: 'inventarios',
    },
    {
      texto: 'Reservaciones',
      ruta: 'reservaciones',
    },
    {
      texto: 'Pasadias',
      ruta: 'pasadias',
    },
    {
      texto: 'Punto de venta',
      ruta: 'punto-de-venta',
    },
  ];
  constructor(private layoutService: LayoutService) {
    this.esMovil = this.layoutService.esMovil;
    this.esTablet = this.layoutService.esTablet;
  }
}
