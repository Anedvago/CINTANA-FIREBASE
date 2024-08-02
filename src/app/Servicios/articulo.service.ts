import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';
import { FechaService } from './fecha.service';
import { ReservaService } from './reserva.service';

@Injectable({
  providedIn: 'root',
})
export class ArticuloService {
  supabaseClient: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
    this.supabaseClient = this.supabaseService.getSupabaseClient();
  }

  public async getArticulosConStockBajo(): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Articles')
      .select('id,name,stock')
      .lte('stock', 10);
    return Rooms;
  }

  public async getArticulos(): Promise<any[] | null> {
    let { data: Rooms, error } = await this.supabaseClient
      .from('Articles')
      .select('*')
      .order('id', { ascending: true });
    return Rooms;
  }
  public async crearArticulo(article: any) {
    let { data, error } = await this.supabaseClient
      .from('Articles')
      .insert([article])
      .select('*');

    return data;
  }
  public async actualizarArticulo(article: any) {
    let { data } = await this.supabaseClient
      .from('Articles')
      .update([article])
      .eq('id', article.id)
      .select('*');
    return data;
  }
  public async eliminarArticulo(id: number) {
    const { data } = await this.supabaseClient
      .from('Articles')
      .delete()
      .eq('id', id);

    return data;
  }
}
