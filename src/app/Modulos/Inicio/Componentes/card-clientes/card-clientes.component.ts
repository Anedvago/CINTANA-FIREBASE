import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TableComponent } from '../../../../Components/table/table.component';
import { ClienteService } from '../../../../Servicios/cliente.service';

@Component({
  selector: 'app-card-clientes',
  standalone: true,
  imports: [MatCardModule, TableComponent],
  templateUrl: './card-clientes.component.html',
  styleUrl: './card-clientes.component.css',
})
export class CardClientesComponent implements OnInit {
  columnas: string[] = ['nombre', 'estado', 'habitacion'];
  columnasDisplay: string[] = ['Nombre Cliente', 'Estado', 'Habitacion'];
  datosTabla: any[] = [];
  constructor(
    private clienteService: ClienteService,
    private cdr: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.getClientesEnTransito();
  }
  public getClientesEnTransito() {
    this.clienteService.getClientesEnTransito().subscribe((data: any) => {
      this.datosTabla = data;
      this.cdr.detectChanges();
    });
  }
}
