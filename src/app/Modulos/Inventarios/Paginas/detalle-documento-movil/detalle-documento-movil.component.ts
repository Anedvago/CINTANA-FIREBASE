import { Component } from '@angular/core';
import { DetallesDocumentoComponent } from '../../Components/detalles-documento/detalles-documento.component';
import { TotalesDocumentoComponent } from '../../Components/totales-documento/totales-documento.component';
import { ActivatedRoute } from '@angular/router';
import { CompraService } from '../../../../Servicios/compra.service';
import { DescargoService } from '../../../../Servicios/descargo.service';

@Component({
  selector: 'app-detalle-documento-movil',
  standalone: true,
  imports: [DetallesDocumentoComponent, TotalesDocumentoComponent],
  templateUrl: './detalle-documento-movil.component.html',
  styleUrl: './detalle-documento-movil.component.css',
})
export class DetalleDocumentoMovilComponent {
  idFactura: string = '';
  tipoDocumento: string = '';
  detallesDeLaFactura: any[] = [];
  totales: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private comprasService: CompraService,
    private descargoService: DescargoService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.tipoDocumento = params['tipo'];
      this.idFactura = params['id'];
    });
    if (this.tipoDocumento == 'compra') {
      this.getDetallesDeComprasPorId();
    }
    if (this.tipoDocumento == 'descargo') {
      this.getDetallesDeBajasPorId();
    }
  }
  getDetallesDeComprasPorId() {
    this.comprasService
      .getDetallesDeFactura(parseInt(this.idFactura))
      .then((data) => {
        this.detallesDeLaFactura = data!;
        this.getTotalesDeCompras();
      });
  }
  getTotalesDeCompras() {
    this.comprasService.getCabeceras().then((data) => {
      this.totales = data!.filter((elem) => {
        return elem.id == this.idFactura;
      });
    });
  }
  getDetallesDeBajasPorId() {
    this.descargoService
      .getDetallesDeFactura(parseInt(this.idFactura))
      .then((data) => {
        this.detallesDeLaFactura = data!;
        this.getTotalesDeCompras();
      });
  }
  getTotalesDeBajas() {
    this.descargoService.getCabeceras().then((data) => {
      this.totales = data!.filter((elem) => {
        return elem.id == this.idFactura;
      });
    });
  }
}
