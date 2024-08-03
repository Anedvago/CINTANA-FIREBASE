import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ArticuloService } from '../../../../Servicios/articulo.service';
import { TableComponent } from '../../../../Components/table/table.component';
import { TablaComponent } from '../../../../Components/tabla/tabla.component';
import { ColumnaTabla } from '../../../../Modelos/ColumnaTabla';

@Component({
  selector: 'app-card-stock-bajo',
  standalone: true,
  imports: [MatCardModule, TableComponent, TablaComponent],
  templateUrl: './card-stock-bajo.component.html',
  styleUrl: './card-stock-bajo.component.css',
})
export class CardStockBajoComponent implements OnInit {
  public columnas: ColumnaTabla[] = [
    {
      titulo: 'Articulo',
      atributo: 'Articulo',
    },
    {
      titulo: 'Estado',
      atributo: 'Estado',
    },
    {
      titulo: 'Stock',
      atributo: 'Stock',
    },
  ];
  public datosTabla: any[] = [];
  constructor(private articuloService: ArticuloService) {}
  ngOnInit(): void {
    this.getArticulosConBajoStock();
  }
  public getArticulosConBajoStock() {
    this.articuloService.getArticulosConStockBajo().then((data) => {
      this.datosTabla = data!.map((item: any) => {
        return {
          Articulo: item.name,
          Estado: item.stock == 0 ? 'Agotado' : 'Por Agotar',
          Stock: item.stock,
        };
      });
    });
  }
}
