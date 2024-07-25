import { Injectable } from '@angular/core';
import { FechaService } from './fecha.service';
import { SupabaseService } from './supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { Habitacion } from '../Modelos/Habitacion';
import { Subject } from 'rxjs';
import { ReservaService } from './reserva.service';

@Injectable({
  providedIn: 'root',
})
export class HabitacionService {
  supabaseClient: SupabaseClient;

  constructor(
    private fechaService: FechaService,
    private supabaseService: SupabaseService,
    private reservaService: ReservaService
  ) {
    this.supabaseClient = this.supabaseService.getSupabaseClient();
  }

  async getDatosDeHabitaciones() {
    const ahora = this.fechaService.getFechaHora();
    const mañana = this.fechaService.getFechaHoraMañana();
    let { data: todas } = await this.supabaseClient
      .from('Rooms')
      .select('*')
      .order('name');

    let { data: ocupadas } = await this.supabaseClient
      .from('Bookings')
      .select('room')
      .gt('end', ahora)
      .lt('start', ahora);

    let { data: reservadas } = await this.supabaseClient
      .from('Bookings')
      .select('room')
      .gt('start', ahora)
      .lt('start', mañana);

    todas = todas!.map((obj) => {
      return { ...obj, state: 'libre' };
    });

    reservadas?.forEach((element: any) => {
      todas!.find((obj) => obj.id == element.room).state = 'reservada';
    });
    ocupadas?.forEach((element: any) => {
      todas!.find((obj) => obj.id == element.room).state = 'ocupada';
    });
    return todas;
  }

  public getSubscripcionDeHabitaciones() {
    const changes = new Subject();
    this.reservaService.detectarCambiosEnReservas().subscribe(() => {
      this.getDatosDeHabitaciones().then((data) => {
        changes.next(data);
      });
    });

    return changes.asObservable();
  }
}
