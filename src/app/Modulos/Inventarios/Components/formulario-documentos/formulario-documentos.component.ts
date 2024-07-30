import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutService } from '../../../../Servicios/layout.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-formulario-documentos',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatIconModule,
    NgClass,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './formulario-documentos.component.html',
  styleUrl: './formulario-documentos.component.css',
})
export class FormularioDocumentosComponent {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  constructor(private layoutService: LayoutService) {}
}
