import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { TableComponent } from '../../../../Components/table/table.component';
import { CompraService } from '../../../../Servicios/compra.service';
import { LayoutService } from '../../../../Servicios/layout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-documentos',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './lista-documentos.component.html',
  styleUrl: './lista-documentos.component.css',
})
export class ListaDocumentosComponent implements OnChanges {
  columnas = ['date', 'id'];
  columnasDisplay = ['Fecha', 'Num'];
  @Input() datos: any[] = [];
  @Input() tipo: string = '';
  facturaSeleccionada: any;
  @Output() seleccionDeFactura = new EventEmitter<any>();
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  constructor(private layoutService: LayoutService, private router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.facturaSeleccionada = this.datos[0];
  }
  seleccionarFactura(factura: any) {
    this.facturaSeleccionada = factura;
    this.seleccionDeFactura.emit(factura);
    if (this.esMovil) {
      this.router.navigate([
        `inventarios/detalle-documento/${this.tipo}/${this.facturaSeleccionada.id}`,
      ]);
    }
  }
}
