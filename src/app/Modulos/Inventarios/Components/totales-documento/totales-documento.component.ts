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
  selector: 'app-totales-documento',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './totales-documento.component.html',
  styleUrl: './totales-documento.component.css',
})
export class TotalesDocumentoComponent {
  public columnas = ['references', 'units', 'gross', 'discount', 'net'];
  public columnasDisplay = [
    'Refernecias',
    'Unidades',
    'Bruto',
    'Descuento',
    'Neto',
  ];
  @Input() datos: any[] = [];
}
