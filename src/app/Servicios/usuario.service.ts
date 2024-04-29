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
    try {
      const { data, error }: AuthTokenResponse =
        await this.supabaseClient.auth.signInWithPassword({
          email: email,
          password: password,
        });
      /* this.setUser(); */
      return error ? error : data;
    } catch (error) {
      console.log('El error es');

      console.log(error);
      /*  return error as AuthError; */
    }
  }
}
