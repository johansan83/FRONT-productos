// ─── src/app/app.component.ts

import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.component.html'
})
export class AppComponent {
  // Inyectamos AuthService para controlar estado de autenticación
  private auth = inject(AuthService);

  // Inyectamos Router para navegación programática
  private router = inject(Router);

  // Observable que emite el email del usuario autenticado (o null)
  user$ = this.auth.user$;

  /**
   * Logout:
   * - Elimina tokens del localStorage y limpia el estado del usuario
   * - Redirige automáticamente a la pantalla de login
   */
  logout() {
    this.auth.logout(); 
    this.router.navigateByUrl('/login');
  }
}
