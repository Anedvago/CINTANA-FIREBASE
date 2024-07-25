import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CardOpcionComponent } from '../../Components/card-opcion/card-opcion.component';
import { LayoutService } from '../../../../Servicios/layout.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CardOpcionComponent, NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  esMovil = this.layoutService.esMovil;
  esTablet = this.layoutService.esTablet;
  constructor(private router: Router, private layoutService: LayoutService) {}
  public navigateTo(route: string): void {
    this.router.navigate([`/inventarios/${route}`]);
  }
}
