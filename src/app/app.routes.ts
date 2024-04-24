import { Routes } from '@angular/router';
import { LoginComponent } from './Modules/Autenticacion/Pages/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./Modules/Administracion/administracion.routes').then(
        (m) => m.routes
      ),
  },
];
