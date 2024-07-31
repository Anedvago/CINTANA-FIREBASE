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

  convertirFecha(fechaString: string): string {
    const fecha = new Date(fechaString);

    const año = fecha.getFullYear();
    const mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const día = ('0' + fecha.getDate()).slice(-2);
    const horas = ('0' + fecha.getHours()).slice(-2);
    const minutos = ('0' + fecha.getMinutes()).slice(-2);
    const segundos = ('0' + fecha.getSeconds()).slice(-2);

    return `${año}-${mes}-${día} ${horas}:${minutos}:${segundos}`;
  }
  convertirFechaReversa(fechaString: string): string {
    const [fecha, hora] = fechaString.split(' ');
    const [año, mes, día] = fecha.split('-');
    const [horas, minutos, segundos] = hora.split(':');

    const fechaObj = new Date(
      +año,
      +mes - 1,
      +día,
      +horas,
      +minutos,
      +segundos
    );
    return fechaObj.toString(); // Convierte a formato Wed Jul 31 2024 00:00:00 GMT-0500 (hora estándar de Colombia)
  }
}
