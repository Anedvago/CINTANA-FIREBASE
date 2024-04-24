import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../../Services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Auth, authState, user } from '@angular/fire/auth';
import { AuthResponse } from '../../../../Models/AuthResponse';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public user: any;
  public authState: any;

  public formulario = this.formBuilder.group({
    correo: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]],
  });

  constructor(
    private router: Router,
    private servicioUsuario: UsuarioService,
    private formBuilder: FormBuilder
  ) {}

  public login(): void {
    this.servicioUsuario
      .login(
        this.formulario.get('correo')?.value!,
        this.formulario.get('contrasena')?.value!
      )
      .then((data: AuthResponse) => {
        if (data._tokenResponse) {
          this.router.navigate(['/admin']);
        }
      })
      .catch(() => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error en la autenticacion!',
          timer: 2000,
        });
      });
  }
}
