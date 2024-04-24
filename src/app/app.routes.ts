import { Routes } from '@angular/router';
import { LoginComponent } from './Modules/Autenticacion/Pages/login/login.component';
import { LayoutComponent } from './Components/layout/layout.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () =>
          import('./Modules/Administracion/administracion.routes').then(
            (m) => m.routes
          ),
      },
    ],
  },
];
