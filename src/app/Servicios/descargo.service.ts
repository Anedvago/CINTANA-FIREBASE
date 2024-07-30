import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class DescargoService {
  supabaseClient: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
    this.supabaseClient = this.supabaseService.getSupabaseClient();
  }
  public async getCabeceras(): Promise<any[] | null> {
    let { data: DischargesCab, error } = await this.supabaseClient
      .from('DischargesCab')
      .select('*');
    return DischargesCab;
  }

  public async getDetallesDeFactura(id: number): Promise<any[] | null> {
    let { data: PurchasesCab, error } = await this.supabaseClient
      .from('DischargesLin')
      .select('*')
      .eq('facture', id);
    return PurchasesCab;
  }
}
