import { Component } from '@angular/core';
import { CardHabitacionComponent } from '../../Components/card-habitacion/card-habitacion.component';
import { HabitacionService } from '../../../../Services/habitacion.service';

@Component({
  selector: 'app-panel-administracion',
  standalone: true,
  imports: [CardHabitacionComponent],
  templateUrl: './panel-administracion.component.html',
  styleUrl: './panel-administracion.component.css',
})
export class PanelAdministracionComponent {
  public totalRooms: number = 0;
  public reservedRooms: number = 0;
  public freeRooms: number = 0;
  public ocupedRooms: number = 0;
  public rooms: any = [];

  constructor(private habitacionService: HabitacionService) {
    habitacionService.obtenerHabitaciones().then((data) => {
      console.log(data);
    });
  }
}
