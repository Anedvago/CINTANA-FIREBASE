import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  supabaseClient: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
    this.supabaseClient = this.supabaseService.getSupabaseClient();
  }

  public async getServicios(): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Services')
      .select('*');
    return Rooms;
  }
  public async crearServicio(servicio: any) {
    let { data, error } = await this.supabaseClient
      .from('Services')
      .insert([servicio])
      .select('*');

    console.log(error);

    return data;
  }
  public async actualizarServicio(service: any) {
    let { data, error } = await this.supabaseClient
      .from('Services')
      .update([service])
      .eq('id', service.id)
      .select('*');
    return data;
  }
  public async eliminarServicio(id: number) {
    const { error } = await this.supabaseClient
      .from('Services')
      .delete()
      .eq('id', id);

    return error;
  }
}
