import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { FechaService } from './fecha.service';
import { Subject } from 'rxjs';
import { ReservaService } from './reserva.service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  supabaseClient: SupabaseClient;
  constructor(
    private supabaseService: SupabaseService,
    private fechaService: FechaService,
    private reservaService: ReservaService
  ) {
    this.supabaseClient = this.supabaseService.getSupabaseClient();
  }

  public getClientesEnTransito() {
    const changes = new Subject();
    this.reservaService.detectarCambiosEnReservas().subscribe(() => {
      this.ObtenerClientesEnTransito().then((data) => {
        changes.next(data);
      });
    });
    return changes.asObservable();
  }

  public async ObtenerClientesEnTransito() {
    let clients: any[] = [];
    let { data: ClientsReserved } = await this.supabaseClient
      .from('Bookings')
      .select('Customers(*),Rooms(*)')
      .gt('start', this.fechaService.getFechaHora())
      .lt('start', this.fechaService.getFechaHoraMañana());
    let { data: ClientsOcuped } = await this.supabaseClient
      .from('Bookings')
      .select('Customers(*),Rooms(*)')
      .gt('end', this.fechaService.getFechaHora())
      .lt('start', this.fechaService.getFechaHora());

    clients = clients.concat(
      ClientsReserved?.map((elem: any) => {
        return {
          ...elem,
          nombre: elem.Customers.name,
          estado: 'Reservado',
          habitacion: elem.Rooms.name,
        };
      })
    );
    clients = clients.concat(
      ClientsOcuped?.map((elem: any) => {
        return {
          ...elem,
          nombre: elem.Customers.name,
          estado: 'Ocupado',
          habitacion: elem.Rooms.name,
        };
      })
    );
    return clients;
  }
}
