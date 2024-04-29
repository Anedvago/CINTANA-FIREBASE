import { Routes } from '@angular/router';
import { LoginComponent } from './Modulos/Autenticacion/Paginas/login/login.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { InicioComponent } from './Modulos/Inicio/Paginas/inicio/inicio.component';
import { MenuComponent } from './Modulos/Inventarios/Paginas/menu/menu.component';
import { CalendarioComponent } from './Modulos/Reservaciones/Paginas/calendario/calendario.component';
import { CalendarioComponent as CalendarioPasadias } from './Modulos/Pasadias/Paginas/calendario/calendario.component';
import { PuntoDeVentaComponent } from './Modulos/PuntoDeVenta/Paginas/punto-de-venta/punto-de-venta.component';
export const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      { path: 'inventarios', component: MenuComponent },
      { path: 'reservaciones', component: CalendarioComponent },
      { path: 'pasadias', component: CalendarioPasadias },
      { path: 'punto-de-venta', component: PuntoDeVentaComponent },
    ],
  },
  { path: 'login', component: LoginComponent },
];
