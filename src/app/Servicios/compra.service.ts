import { Injectable } from '@angular/core';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class CompraService {
  supabaseClient: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
    this.supabaseClient = this.supabaseService.getSupabaseClient();
  }

  public async getCabeceras(): Promise<any[] | null> {
    let { data: PurchasesCab, error } = await this.supabaseClient
      .from('PurchasesCab')
      .select('*');
    return PurchasesCab;
  }
  public async getDetallesDeFactura(id: number): Promise<any[] | null> {
    let { data: PurchasesCab, error } = await this.supabaseClient
      .from('PurchasesLin')
      .select('*')
      .eq('facture', id);
    return PurchasesCab;
  }
}
