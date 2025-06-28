// ─── src/app/auth/login.component.ts

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  // Formulario para capturar email y contraseña
  form: FormGroup;

  /**
   * Inicializa el formulario con validaciones:
   * - email: requerido y formato válido
   * - password: requerido
   * Inyecta FormBuilder para construir el formulario,
   * AuthService para el login, y Router para redirecciones.
   */
  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Método llamado al enviar el formulario:
   * - Valida primero que el formulario sea correcto
   * - Llama a AuthService.login() con email y password
   * - En caso de éxito redirige a la ruta /products
   * - En caso de error muestra un alert con el mensaje
   */
  submit() {
    if (this.form.invalid) return;
    this.auth.login(this.form.value.email, this.form.value.password)
      .subscribe({
        next: () => this.router.navigate(['/products']),
        error: () => alert('Credenciales inválidas')
      });
  }
}
