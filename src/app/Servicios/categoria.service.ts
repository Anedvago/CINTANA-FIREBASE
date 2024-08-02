import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  supabaseClient: SupabaseClient;
  constructor(private supabaseService: SupabaseService) {
    this.supabaseClient = this.supabaseService.getSupabaseClient();
  }

  async getCategoriasDeArticulos() {
    let { data: Departaments } = await this.supabaseClient
      .from('Departaments')
      .select('*')
      .eq('type', 'A');
    let { data: Sections } = await this.supabaseClient
      .from('Sections')
      .select('*')
      .eq('type', 'A');
    let { data: Families } = await this.supabaseClient
      .from('Families')
      .select('*')
      .eq('type', 'A');

    let secciones = Sections!.reduce((acc: any, objeto: any) => {
      const departament = objeto.departament;
      if (!acc[departament]) {
        acc[departament] = [];
      }
      acc[departament].push(objeto);
      return acc;
    }, {});
    let familias = Families!.reduce((acc: any, objeto: any) => {
      const section = objeto.section;
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(objeto);
      return acc;
    }, {});

    Sections?.forEach((element) => {
      element.children = familias[element.id];
    });
    Departaments?.forEach((element) => {
      element.children = secciones[element.id];
    });

    return Departaments;
  }

  async getCategoriasDeServicios() {
    let { data: Departaments } = await this.supabaseClient
      .from('Departaments')
      .select('*')
      .eq('type', 'S');
    let { data: Sections } = await this.supabaseClient
      .from('Sections')
      .select('*')
      .eq('type', 'S');
    let { data: Families } = await this.supabaseClient
      .from('Families')
      .select('*')
      .eq('type', 'S');

    let secciones = Sections!.reduce((acc: any, objeto: any) => {
      const departament = objeto.departament;
      if (!acc[departament]) {
        acc[departament] = [];
      }
      acc[departament].push(objeto);
      return acc;
    }, {});
    let familias = Families!.reduce((acc: any, objeto: any) => {
      const section = objeto.section;
      if (!acc[section]) {
        acc[section] = [];
      }
      acc[section].push(objeto);
      return acc;
    }, {});

    Sections?.forEach((element) => {
      element.children = familias[element.id];
    });
    Departaments?.forEach((element) => {
      element.children = secciones[element.id];
    });

    return Departaments;
  }

  async getDepartametosDeArticulos() {
    let { data: Departaments } = await this.supabaseClient
      .from('Departaments')
      .select('*')
      .eq('type', 'A');
    return Departaments;
  }
  async getDepartametosDeServicios() {
    let { data: Departaments } = await this.supabaseClient
      .from('Departaments')
      .select('*')
      .eq('type', 'S');
    return Departaments;
  }
  async getSeccionesDeArticulos() {
    let { data: Sections } = await this.supabaseClient
      .from('Sections')
      .select('*')
      .eq('type', 'A');
    return Sections;
  }
  async getSeccionesDeServicios() {
    let { data: Sections } = await this.supabaseClient
      .from('Sections')
      .select('*')
      .eq('type', 'S');
    return Sections;
  }
  async getFamiliasDeArticulos() {
    let { data: Families } = await this.supabaseClient
      .from('Families')
      .select('*')
      .eq('type', 'A');
    return Families;
  }
  async getFamiliasDeServicios() {
    let { data: Families } = await this.supabaseClient
      .from('Families')
      .select('*')
      .eq('type', 'S');
    return Families;
  }
}
