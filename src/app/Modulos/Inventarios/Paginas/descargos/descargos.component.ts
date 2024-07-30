import { Component } from '@angular/core';
import { FormularioDocumentosComponent } from '../../Components/formulario-documentos/formulario-documentos.component';
import { ListaDocumentosComponent } from '../../Components/lista-documentos/lista-documentos.component';
import { DetallesDocumentoComponent } from '../../Components/detalles-documento/detalles-documento.component';
import { TotalesDocumentoComponent } from '../../Components/totales-documento/totales-documento.component';
import { CompraService } from '../../../../Servicios/compra.service';
import { DescargoService } from '../../../../Servicios/descargo.service';
import { LayoutService } from '../../../../Servicios/layout.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-descargos',
  standalone: true,
  imports: [
    FormularioDocumentosComponent,
    ListaDocumentosComponent,
    DetallesDocumentoComponent,
    TotalesDocumentoComponent,
    NgClass,
  ],
  templateUrl: './descargos.component.html',
  styleUrl: './descargos.component.css',
})
export class DescargosComponent {
  facturaSeleccionada: any;
  facturasDeBaja: any[] = [];
  listaDeFacturas: any[] = [];
  listaDeFacturasFiltradas: any[] = [];
  detallesDeLaFactura: any[] = [];
  totalesFactura: any[] = [];
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  constructor(
    private layoutService: LayoutService,
    private descargoService: DescargoService
  ) {}
  ngOnInit(): void {
    this.getFacturas();
  }
  seleccionarFactura(factura: any) {
    this.facturaSeleccionada = factura;
    this.establecerTotales();
    this.getDetallesDeFacturaPorId();
  }
  establecerTotales() {
    this.totalesFactura = this.facturasDeBaja!.filter((elem) => {
      return elem.id == this.facturaSeleccionada.id;
    });
    console.log(this.totalesFactura);
  }

  getFacturas() {
    this.descargoService.getCabeceras().then((data) => {
      this.facturasDeBaja = data!;
      this.listaDeFacturas = this.convertirFacturasEnListado(data!);
      this.listaDeFacturasFiltradas = this.convertirFacturasEnListado(data!);
      this.seleccionarFactura(this.listaDeFacturasFiltradas[0]);
    });
  }
  convertirFacturasEnListado(facturas: any[]) {
    return facturas!.map(function (obj) {
      return { id: obj.id, date: obj.date.substring(0, 10) };
    });
  }
  getDetallesDeFacturaPorId() {
    this.descargoService
      .getDetallesDeFactura(this.facturaSeleccionada.id)
      .then((data) => {
        this.detallesDeLaFactura = data!;
      });
  }
}
