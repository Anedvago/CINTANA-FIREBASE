import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ClienteService } from '../../../../Servicios/cliente.service';
import { TablaComponent } from '../../../../Components/tabla/tabla.component';
import { ColumnaTabla } from '../../../../Modelos/ColumnaTabla';

@Component({
  selector: 'app-card-clientes',
  standalone: true,
  imports: [MatCardModule, TablaComponent],
  templateUrl: './card-clientes.component.html',
  styleUrl: './card-clientes.component.css',
})
export class CardClientesComponent implements OnInit {
  columnas: ColumnaTabla[] = [
    { titulo: 'Nombre Cliente', atributo: 'nombre' },
    { titulo: 'Estado', atributo: 'estado' },
    { titulo: 'Habitacion', atributo: 'habitacion' },
  ];
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
