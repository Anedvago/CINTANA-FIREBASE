import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  supabaseClient: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
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
        .select('*,Customers (name), Rooms (name,color)')
        .then((data) => {
          changes.next(data.data);
        });
    });
    return changes.asObservable();
  }
}
