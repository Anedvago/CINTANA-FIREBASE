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
}
