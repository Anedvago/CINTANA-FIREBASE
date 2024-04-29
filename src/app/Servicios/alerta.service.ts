import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class AlertaService {
  constructor() {}

  exito(texto: string) {
    Swal.fire({
      title: texto,
      icon: 'success',
      timer: 2000,
      showConfirmButton: false,
    });
  }
  info(texto: string) {
    Swal.fire({
      title: texto,
      icon: 'info',
      timer: 2000,
      showConfirmButton: false,
    });
  }
  error(texto: string) {
    Swal.fire({
      title: texto,
      icon: 'error',
      timer: 2000,
      showConfirmButton: false,
    });
  }
}
