import { Component, OnInit } from '@angular/core';
import { FormularioDocumentosComponent } from '../../Components/formulario-documentos/formulario-documentos.component';
import { ListaDocumentosComponent } from '../../Components/lista-documentos/lista-documentos.component';
import { DetallesDocumentoComponent } from '../../Components/detalles-documento/detalles-documento.component';
import { TotalesDocumentoComponent } from '../../Components/totales-documento/totales-documento.component';
import { CompraService } from '../../../../Servicios/compra.service';
import { LayoutService } from '../../../../Servicios/layout.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [
    FormularioDocumentosComponent,
    ListaDocumentosComponent,
    DetallesDocumentoComponent,
    TotalesDocumentoComponent,
    NgClass,
  ],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css',
})
export class ComprasComponent implements OnInit {
  facturaSeleccionada: any;
  facturasDeCompra: any[] = [];
  listaDeFacturas: any[] = [];
  listaDeFacturasFiltradas: any[] = [];
  detallesDeLaFactura: any[] = [];
  totalesFactura: any[] = [];
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  constructor(
    private layoutService: LayoutService,
    private compraService: CompraService
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
    this.totalesFactura = this.facturasDeCompra!.filter((elem) => {
      return elem.id == this.facturaSeleccionada.id;
    });
    console.log(this.totalesFactura);
  }

  getFacturas() {
    this.compraService.getCabeceras().then((data) => {
      this.facturasDeCompra = data!;
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
    this.compraService
      .getDetallesDeFactura(this.facturaSeleccionada.id)
      .then((data) => {
        this.detallesDeLaFactura = data!;
      });
  }
}
