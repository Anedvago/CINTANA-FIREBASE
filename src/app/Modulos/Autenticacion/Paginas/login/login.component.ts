import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { LayoutService } from '../../../../Servicios/layout.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UsuarioService } from '../../../../Servicios/usuario.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatGridListModule,
    AsyncPipe,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  esMovil = this.layoutService.esMovil;
  formularioLogin = this.formBuilder.group({
    usuario: ['', [Validators.required, Validators.email]],
    contrasena: ['', [Validators.required]],
  });
  constructor(
    private layoutService: LayoutService,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService
  ) {}

  login() {
    this.usuarioService
      .login(
        this.formularioLogin.get('usuario')?.value!,
        this.formularioLogin.get('contrasena')?.value!
      )
      .then((data) => {
        console.log(data);
      });
  }
}
