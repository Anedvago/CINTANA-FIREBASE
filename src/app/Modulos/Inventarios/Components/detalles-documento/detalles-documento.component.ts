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
export class DetallesDocumentoComponent implements OnChanges {
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
  datos: any[] = [];
  @Input() facturaSeleccionada: any;
  constructor(private compraService: CompraService) {}
  ngOnChanges(changes: SimpleChanges): void {
    if (this.facturaSeleccionada != undefined) {
      this.getDetallesDeFacturaPorId();
    }
  }
  getDetallesDeFacturaPorId() {
    this.compraService
      .getDetallesDeFactura(this.facturaSeleccionada.id)
      .then((data) => {
        this.datos = data!;
      });
  }
}
