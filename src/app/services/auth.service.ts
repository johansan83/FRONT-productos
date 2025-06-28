// ─── src/app/services/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

/**
 * Servicio de autenticación:
 * - Maneja login/logout
 * - Almacena JWT/texto del usuario en LocalStorage
 * - Expone estado de autenticación a través de un observable
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  /** Sujeto para emitir cambios en el email del usuario autenticado */
  private userSubject = new BehaviorSubject<string | null>(null);
  /** Observable público para suscribirse al estado del usuario */
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {
    // Al iniciar, cargar email de usuario almacenado (si existe)
    const stored = localStorage.getItem('userEmail');
    this.userSubject.next(stored);
  }

  /**
   * Realiza login con email y contraseña,
   * espera recibir un jwt y actualiza LocalStorage y estado local.
   *
   * @param email - email del usuario
   * @param password - contraseña del usuario
   * @returns Observable que emite la respuesta del servidor
   */
  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>(
        'http://localhost:3000/auth/login',
        { email, password }
      )
      .pipe(
        tap(res => {
          // Guardar JWT y email en LocalStorage
          localStorage.setItem('jwt', res.token);
          localStorage.setItem('userEmail', email);
          // Emitir el nuevo estado de usuario autenticado
          this.userSubject.next(email);
        })
      );
  }

  /**
   * Cierra la sesión del usuario:
   * - Elimina token y email del almacenamiento
   * - Actualiza el estado notificando que no hay usuario logueado
   */
  logout() {
    localStorage.removeItem('jwt');
    localStorage.removeItem('userEmail');
    this.userSubject.next(null);
  }

  /**
   * Devuelve el token JWT almacenado, o null si no existe
   */
  get token(): string | null {
    return localStorage.getItem('jwt');
  }

  /**
   * Indica si existe un token JWT válido en el LocalStorage
   */
  isAuthenticated(): boolean {
    return !!this.token;
  }
}
