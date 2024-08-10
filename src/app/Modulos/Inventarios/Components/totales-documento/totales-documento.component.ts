import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TableComponent } from '../../../../Components/table/table.component';
import { CompraService } from '../../../../Servicios/compra.service';
import { TablaComponent } from '../../../../Components/tabla/tabla.component';
import { ColumnaTabla } from '../../../../Modelos/ColumnaTabla';

@Component({
  selector: 'app-totales-documento',
  standalone: true,
  imports: [TablaComponent],
  templateUrl: './totales-documento.component.html',
  styleUrl: './totales-documento.component.css',
})
export class TotalesDocumentoComponent {
  columnas: ColumnaTabla[] = [
    { titulo: 'Refernecias', atributo: 'references' },
    { titulo: 'Unidades', atributo: 'units' },
    { titulo: 'Bruto', atributo: 'gross' },
    { titulo: 'Descuento', atributo: 'discount' },
    { titulo: 'Neto', atributo: 'net' },
  ];

  @Input() datos: any[] = [];
}
