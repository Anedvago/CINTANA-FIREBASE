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
export class TotalesDocumentoComponent implements OnChanges, OnInit {
  public columnas = ['references', 'units', 'gross', 'discount', 'net'];
  public columnasDisplay = [
    'Refernecias',
    'Unidades',
    'Bruto',
    'Descuento',
    'Neto',
  ];
  @Input() facturaSeleccionada: any;
  datos: any[] = [];
  cabeceras: any[] = [];
  constructor(private compraService: CompraService) {}
  ngOnInit(): void {
    this.getCabecerasDeFactura();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (this.facturaSeleccionada != undefined) {
      this.seleccionarFactura();
    }
  }

  seleccionarFactura() {
    this.datos = this.cabeceras!.filter((elem) => {
      return elem.id == this.facturaSeleccionada.id;
    });
  }

  getCabecerasDeFactura() {
    this.compraService.getCabeceras().then((data) => {
      this.cabeceras = data!;
      this.seleccionarFactura();
    });
  }
}
