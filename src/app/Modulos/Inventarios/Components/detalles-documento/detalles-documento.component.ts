import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { TableComponent } from '../../../../Components/table/table.component';
import { CompraService } from '../../../../Servicios/compra.service';

@Component({
  selector: 'app-detalles-documento',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './detalles-documento.component.html',
  styleUrl: './detalles-documento.component.css',
})
export class DetallesDocumentoComponent {
  columnas = [
    'reference',
    'description',
    'units',
    'value',
    'discount',
    'total',
  ];
  columnasDisplay = [
    'Ref',
    'Descripcion',
    'Unidades',
    'Precio',
    'Descuento',
    'Total',
  ];
  @Input() datos: any[] = [];
}
