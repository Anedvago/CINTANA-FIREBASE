import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  supabaseClient: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
    this.supabaseClient = this.supabaseService.getSupabaseClient();
  }

  async getParametrosConfiguracion() {
    let { data: Config } = await this.supabaseClient
      .from('Configuracion')
      .select('*')
      .order('id');
    return Config;
  }
  async getParametroPorNombre(nombreParametro: string) {
    let { data: Config } = await this.supabaseClient
      .from('Configuracion')
      .select('*')
      .eq('nombre', nombreParametro);
    return Config;
  }

  async getParametroPorNombres(
    nombreParametro1: string,
    nombreParametro2: string
  ) {
    let { data: Config } = await this.supabaseClient
      .from('Configuracion')
      .select('*')
      .in('nombre', [nombreParametro1, nombreParametro2]);
    return Config;
  }

  public async actualizarParametro(parametro: any) {
    let { data } = await this.supabaseClient
      .from('Configuracion')
      .update([parametro])
      .eq('id', parametro.id)
      .select('*');
    return data;
  }
}
