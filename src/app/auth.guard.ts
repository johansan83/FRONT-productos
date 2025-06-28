// ─── src/app/app.guard.ts ───────────────────────────────────────────────

import { inject } from "@angular/core";
import { CanActivateFn, UrlTree, Router } from "@angular/router";
import { AuthService } from "./services/auth.service";

/**
 * Guardia de rutas (route guard) que protege componentes según autenticación JWT.
 * Implementación con función standalone (CanActivateFn) para Angular moderno.
 *
 * Este guard:
 * - Verifica si el usuario está autenticado a través de AuthService.
 * - Si está autenticado, permite acceder a la ruta (retorna true).
 * - Si no, redirige automáticamente al login (retorna UrlTree hacia '/login').
 *
 * @param route - Información de la ruta que se intenta acceder (no utilizado aquí).
 * @param state - Estado actual de navegación (no utilizado directamente).
 * @returns boolean | UrlTree
 *   - true: acceso permitido
 *   - UrlTree: redirección a login
 */
export const authGuard: CanActivateFn = (route, state) => {
  // Inyecta AuthService y Router usando DI standalone
  const authService = inject(AuthService);
  const router = inject(Router);

  // Si hay token JWT válido, permite navegación
  if (authService.isAuthenticated()) {
    return true;
  }

  // Si no está autenticado, construye y retorna una redirección al login
  return router.parseUrl('/login');
};
