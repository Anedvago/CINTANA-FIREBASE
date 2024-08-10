import { Component, Input } from '@angular/core';
import { TableComponent } from '../../../../Components/table/table.component';
import { TablaComponent } from '../../../../Components/tabla/tabla.component';
import { ColumnaTabla } from '../../../../Modelos/ColumnaTabla';

@Component({
  selector: 'app-detalles-documento',
  standalone: true,
  imports: [TablaComponent],
  templateUrl: './detalles-documento.component.html',
  styleUrl: './detalles-documento.component.css',
})
export class DetallesDocumentoComponent {
  columnas: ColumnaTabla[] = [
    { titulo: 'Ref', atributo: 'reference' },
    { titulo: 'Descripcion', atributo: 'description' },
    { titulo: 'Unidades', atributo: 'units' },
    { titulo: 'Precio', atributo: 'value' },
    { titulo: 'Descuento', atributo: 'discount' },
    { titulo: 'Total', atributo: 'total' },
  ];

  @Input() datos: any[] = [];
}
