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
}
