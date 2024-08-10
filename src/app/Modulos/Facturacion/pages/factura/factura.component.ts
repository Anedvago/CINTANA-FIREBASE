import { Component } from '@angular/core';
import { ReservaService } from '../../../../Servicios/reserva.service';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from '../../../../Servicios/cliente.service';
import { FechaService } from '../../../../Servicios/fecha.service';
import { TableComponent } from '../../../../Components/table/table.component';
import { NgIf } from '@angular/common';
import { TablaComponent } from '../../../../Components/tabla/tabla.component';
import { ColumnaTabla } from '../../../../Modelos/ColumnaTabla';

@Component({
  selector: 'app-factura',
  standalone: true,
  imports: [TablaComponent, NgIf],
  templateUrl: './factura.component.html',
  styleUrl: './factura.component.css',
})
export class FacturaComponent {
  constructor(
    private bookingService: ReservaService,
    private route: ActivatedRoute,
    private customerService: ClienteService,
    private dateService: FechaService
  ) {
    this.route.params.subscribe((data) => {
      this.idCustomer = data['idCustomer'];
      this.valuesCharges = data['values'].split('-');
      /*  console.log(data['values']); */
      console.log(this.valuesCharges);

      this.obtenerCliente();
      this.obtenerReserva();
      this.esperar();
      //window.print();
    });
  }

  idCustomer?: number;
  customer: any;
  reservation: any;
  columnasClientes: ColumnaTabla[] = [
    { titulo: 'ID', atributo: 'identification' },
    { titulo: 'CLIENTE', atributo: 'name' },
    { titulo: 'TELEFONO', atributo: 'phone' },
  ];
  columnasReservas: ColumnaTabla[] = [
    { titulo: 'CONCEPTO', atributo: 'name' },
    { titulo: 'VALOR', atributo: 'value' },
  ];
  dateFacture: string = '';
  valuesCharges: string[] = [];

  charges = [
    'Estado de las llaves',
    'Estado del colchón',
    'Estado de las sabanas',
    'Estado de las almohadas',
    'Estado de las bombillos',
    'Estado de las toallas',
    'Estado de las ventiladores',
    'Otros cargos adicionales',
  ];

  rowsReservation: any[] = [];
  idReservation!: number;
  date!: string;

  obtenerReserva() {
    const date = new Date();
    const now = this.dateService.convertirFecha(date.toString());
    this.dateFacture = now;
    this.bookingService
      .getReservaParaCheckOut(this.idCustomer!)
      .then((data: any) => {
        this.idReservation = data[0].id;
        this.date = now;
        this.reservation = {
          name: `Servicios de habitacion o cabaña`,
          value: data[0]!.total,
        };
        /* this.columsReservation = ['name', 'value']; */
        this.rowsReservation.push(this.reservation),
          this.charges.forEach((element, index) => {
            this.rowsReservation.push({
              name: element,
              value: parseInt(this.valuesCharges[index]),
            });
          });
        let suma = 0;
        this.rowsReservation.forEach((elem) => {
          suma += elem.value;
        });
        this.rowsReservation.push({
          name: 'TOTAL',
          value: suma,
        });
        this.rowsReservation = this.rowsReservation
          .filter((data) => {
            return data.value != 0;
          })
          .map((data) => {
            return {
              ...data,
              value: this.formatearMonedaColombiana(data.value),
            };
          });
      });
  }

  obtenerCliente() {
    this.customerService.getClientePorId(this.idCustomer!).then((data) => {
      this.customer = data![0];
      /* this.columsCustomer = ['identification', 'name', 'phone']; */
    });
  }

  esperar() {
    setTimeout(() => {
      this.bookingService.checkOut(this.idReservation).then(() => {
        window.print();
      });
    }, 2000);
    /*  setTimeout(() => {
      window.print();
    }, 2000); */
  }
  formatearMonedaColombiana(numero: number): string {
    const formatoColombiano = new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
    });

    return formatoColombiano.format(numero);
  }
}
