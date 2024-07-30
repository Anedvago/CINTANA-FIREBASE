import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TableComponent } from '../../../../Components/table/table.component';
import { CompraService } from '../../../../Servicios/compra.service';

@Component({
  selector: 'app-lista-documentos',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './lista-documentos.component.html',
  styleUrl: './lista-documentos.component.css',
})
export class ListaDocumentosComponent implements OnInit {
  columnas = ['date', 'id'];
  columnasDisplay = ['Fecha', 'Num'];
  datos: any[] = [];
  datosFiltrados: any[] = [];
  facturaSeleccionada: any;
  @Output() seleccionDeFactura = new EventEmitter<any>();
  constructor(private compraService: CompraService) {}
  ngOnInit(): void {
    this.getFacturas();
  }
  getFacturas() {
    this.compraService.getCabeceras().then((data) => {
      this.datos = data!.map(function (obj) {
        return { id: obj.id, date: obj.date.substring(0, 10) };
      });
      this.datosFiltrados = data!.map(function (obj) {
        return { id: obj.id, date: obj.date.substring(0, 10) };
      });
      this.seleccionarFactura(this.datosFiltrados[0]);
    });
  }
  seleccionarFactura(factura: any) {
    this.facturaSeleccionada = factura;
    this.seleccionDeFactura.emit(factura);
  }
}
