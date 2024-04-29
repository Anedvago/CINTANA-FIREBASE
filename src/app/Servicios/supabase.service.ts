import { Injectable } from '@angular/core';
import { SupabaseClient, createClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabaseClient!: SupabaseClient;
  private supabaseEnvironments: { apiKey: string; url: string } =
    environment.supabase;
  constructor() {
    try {
      this.supabaseClient = createClient(
        this.supabaseEnvironments.url,
        this.supabaseEnvironments.apiKey
      );
    } catch (error) {
      console.log('El error por aca es');
      console.log(error);
    }
  }
  getSupabaseClient() {
    return this.supabaseClient;
  }
}
