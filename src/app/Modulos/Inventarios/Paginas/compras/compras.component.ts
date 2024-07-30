import { Component } from '@angular/core';
import { FormularioDocumentosComponent } from '../../Components/formulario-documentos/formulario-documentos.component';
import { ListaDocumentosComponent } from '../../Components/lista-documentos/lista-documentos.component';
import { DetallesDocumentoComponent } from '../../Components/detalles-documento/detalles-documento.component';
import { TotalesDocumentoComponent } from '../../Components/totales-documento/totales-documento.component';

@Component({
  selector: 'app-compras',
  standalone: true,
  imports: [
    FormularioDocumentosComponent,
    ListaDocumentosComponent,
    DetallesDocumentoComponent,
    TotalesDocumentoComponent,
  ],
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.css',
})
export class ComprasComponent {
  facturaSeleccionada: any;
  seleccionarFactura(factura: any) {
    this.facturaSeleccionada = factura;
  }
}
