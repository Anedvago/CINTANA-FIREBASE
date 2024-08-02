import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { Subject } from 'rxjs';
import { FechaService } from './fecha.service';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  supabaseClient: SupabaseClient;
  constructor(
    private supabaseService: SupabaseService,
    private fechaService: FechaService
  ) {
    this.supabaseClient = this.supabaseService.getSupabaseClient();
  }

  public detectarCambiosEnReservas() {
    const changes = new Subject();
    this.supabaseClient
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Bookings' },
        (payload) => {
          changes.next(payload);
        }
      )
      .subscribe(() => {
        changes.next('SUSCRIPCION INICIAL');
      });

    return changes.asObservable();
  }

  public async createReserva(reservacion: any) {
    const { data, error } = await this.supabaseClient
      .from('Bookings')
      .insert([reservacion])
      .select();
    return data;
  }

  getReservaciones() {
    const changes = new Subject();
    this.detectarCambiosEnReservas().subscribe(() => {
      this.supabaseClient
        .from('Bookings')
        .select('*,Customers (*), Rooms (name,color)')
        .then((data) => {
          changes.next(data.data);
        });
    });
    return changes.asObservable();
  }

  public async modificarReservacion(reserva: any, id: number) {
    const { data, error } = await this.supabaseClient
      .from('Bookings')
      .update([reserva])
      .eq('id', id)
      .select();
    return data;
  }
  public async eliminarReservation(id: number) {
    const { data: Reservation, error } = await this.supabaseClient
      .from('Bookings')
      .delete()
      .eq('id', id);
    return Reservation;
  }

  public async getReservaParaCheckIn(idCustomer: number) {
    const today = this.fechaService.getFechaHora();
    const tomorrow = this.fechaService.getFechaHoraMañana();
    const { data: Reservation, error } = await this.supabaseClient
      .from('Bookings')
      .select()
      .gte('start', today)
      .lte('start', tomorrow)
      .is('checkIn', null)
      .eq('customer', idCustomer);

    return Reservation;
  }
  public async getReservaParaCheckOut(idCustomer: number) {
    const today = this.fechaService.getFechaHora();
    const tomorrow = this.fechaService.getFechaHoraMañana();
    const { data: Reservation, error } = await this.supabaseClient
      .from('Bookings')
      .select()
      .is('checkOut', null)
      .eq('customer', idCustomer);

    return Reservation;
  }

  public async checkIn(id: number) {
    const now = this.fechaService.getFechaHora();
    const { data, error } = await this.supabaseClient
      .from('Bookings')
      .update({
        checkIn: now,
      })
      .eq('id', id)
      .select();
    console.log(error);

    return data;
  }

  public async checkOut(id: number) {
    const now = this.fechaService.getFechaHora();
    const { data, error } = await this.supabaseClient
      .from('Bookings')
      .update({
        checkOut: now,
        end: now,
      })
      .eq('id', id)
      .select();
    return data;
  }
}
