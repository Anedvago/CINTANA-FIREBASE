import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ConfiguracionService } from '../../../../Servicios/configuracion.service';
import { CurrencyPipe, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlertaService } from '../../../../Servicios/alerta.service';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    TitleCasePipe,
    FormsModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css',
})
export class ConfiguracionComponent implements OnInit {
  parametros: any[] = [];
  constructor(
    private configService: ConfiguracionService,
    private alertaService: AlertaService
  ) {}
  ngOnInit(): void {
    this.obtenerParametrosDeConfiguracion();
  }
  obtenerParametrosDeConfiguracion() {
    this.configService.getParametrosConfiguracion().then((data) => {
      this.parametros = data!;
    });
  }
  guardarParametros() {
    this.parametros.forEach((element) => {
      this.configService.actualizarParametro(element).then();
    });
    this.alertaService.exito('¡Parametros actualizados!');
  }
}
