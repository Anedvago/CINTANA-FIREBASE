import { Injectable } from '@angular/core';
import { AuthTokenResponse, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  supabaseClient: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
    this.supabaseClient = supabaseService.getSupabaseClient();
  }

  public async login(email: string, password: string): Promise<any> {
    //const { data, error }: AuthTokenResponse =
    return await this.supabaseClient.auth.signInWithPassword({
      email: email,
      password: password,
    });
    //return error ? error : data;
  }
}
