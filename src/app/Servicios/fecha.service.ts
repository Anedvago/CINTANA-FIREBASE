import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FechaService {
  constructor() {}

  public getFechaHora(): string {
    const currentDate = new Date();
    const now = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${currentDate
      .getDate()
      .toString()
      .padStart(2, '0')} ${currentDate
      .getHours()
      .toString()
      .padStart(2, '0')}:${currentDate
      .getMinutes()
      .toString()
      .padStart(2, '0')}:${currentDate
      .getSeconds()
      .toString()
      .padStart(2, '0')}`;
    return now;
  }
  public getFechaHoraMañana(): string {
    const currentDate = new Date();
    const tomorrowDate = new Date(currentDate);
    tomorrowDate.setDate(currentDate.getDate() + 1);

    const year = tomorrowDate.getFullYear();
    const month = (tomorrowDate.getMonth() + 1).toString().padStart(2, '0');
    const day = tomorrowDate.getDate().toString().padStart(2, '0');
    const hours = tomorrowDate.getHours().toString().padStart(2, '0');
    const minutes = tomorrowDate.getMinutes().toString().padStart(2, '0');
    const seconds = tomorrowDate.getSeconds().toString().padStart(2, '0');

    const tomorrow = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return tomorrow;
  }
}
