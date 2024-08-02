import { Routes } from '@angular/router';
import { LoginComponent } from './Modulos/Autenticacion/Paginas/login/login.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { InicioComponent } from './Modulos/Inicio/Paginas/inicio/inicio.component';
import { CalendarioComponent } from './Modulos/Reservaciones/Paginas/calendario/calendario.component';
import { CalendarioComponent as CalendarioPasadias } from './Modulos/Pasadias/Paginas/calendario/calendario.component';
import { PuntoDeVentaComponent } from './Modulos/PuntoDeVenta/Paginas/punto-de-venta/punto-de-venta.component';
import { HabitacionesComponent } from './Modulos/Habitaciones/pages/habitaciones/habitaciones.component';
import { ChecksComponent } from './Modulos/Checks/pages/checks/checks.component';
import { FacturaComponent } from './Modulos/Facturacion/pages/factura/factura.component';
export const routes: Routes = [
  {
    path: '',
    component: SidebarComponent,
    children: [
      { path: 'inicio', component: InicioComponent },
      /*  { path: 'inventarios', component: MenuComponent }, */
      {
        path: 'inventarios',
        loadChildren: () =>
          import('./Modulos/Inventarios/inventario.routes').then(
            (m) => m.routes
          ),
      },
      { path: 'reservaciones', component: CalendarioComponent },
      { path: 'checks', component: ChecksComponent },
      { path: 'habitaciones', component: HabitacionesComponent },
      { path: 'pasadias', component: CalendarioPasadias },
      { path: 'punto-de-venta', component: PuntoDeVentaComponent },
    ],
  },
  { path: 'billing/:idCustomer/:values', component: FacturaComponent },
  { path: 'login', component: LoginComponent },
];
