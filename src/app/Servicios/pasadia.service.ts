import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PasadiaService {
  private supabaseClient: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
    this.supabaseClient = this.supabaseService.getSupabaseClient();
  }

  public obtenerPasadias() {
    const changes = new Subject();
    this.detectarCambiosEnPasadias().subscribe(() => {
      this.supabaseClient
        .from('Pasadias')
        .select('*,Customers (*)')
        .then((data) => {
          changes.next(data.data);
        });
    });
    return changes.asObservable();
  }

  public detectarCambiosEnPasadias() {
    const changes = new Subject();
    this.supabaseClient
      .channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'Pasadias' },
        (payload) => {
          changes.next(payload);
        }
      )
      .subscribe(() => {
        changes.next('SUSCRIPCION INICIAL');
      });

    return changes.asObservable();
  }

  async crearPasadia(clienteId: number, fecha: string) {
    const { data, error } = await this.supabaseClient
      .from('Pasadias')
      .insert([
        {
          cliente: clienteId,
          fecha: fecha,
        },
      ])
      .select();
    return data;
  }

  async actualizarPasadia(clienteId: number, fecha: string, idPasadia: number) {
    const { data, error } = await this.supabaseClient
      .from('Pasadias')
      .update([
        {
          cliente: clienteId,
          fecha: fecha,
        },
      ])
      .eq('id', idPasadia)
      .select();
    return data;
  }
  async eliminarPasadia(id: number) {
    const { data: Reservation, error } = await this.supabaseClient
      .from('Pasadias')
      .delete()
      .eq('id', id);
    return Reservation;
  }
  /* async obtenerIdClientePorPasadia(idPasadia: number) {
    const { data: Reservation, error } = await this.supabaseClient
      .from('Pasadias')
      .delete()
      .eq('id', id);
    return Reservation;
  } */
}
