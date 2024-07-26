import { Routes } from '@angular/router';
import { MenuComponent } from './Paginas/menu/menu.component';
import { ArticulosComponent } from './Paginas/articulos/articulos.component';
import { ServiciosComponent } from './Paginas/servicios/servicios.component';
import { CategoriasComponent } from './Paginas/categorias/categorias.component';
import { ComprasComponent } from './Paginas/compras/compras.component';
import { DescargosComponent } from './Paginas/descargos/descargos.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: MenuComponent,
      },
      {
        path: 'articulos',
        component: ArticulosComponent,
      },
      {
        path: 'servicios',
        component: ServiciosComponent,
      },
      {
        path: 'categorias',
        component: CategoriasComponent,
      },
      {
        path: 'compras',
        component: ComprasComponent,
      },
      {
        path: 'descargos',
        component: DescargosComponent,
      },
    ],
  },
];
