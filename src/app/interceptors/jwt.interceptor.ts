// ─── src/app/interceptors/jwt.interceptor.ts

import { HttpInterceptorFn, HttpHandlerFn, HttpRequest, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; // Ajusta ruta si es necesario

/**
 * Interceptor HTTP para inyectar el token JWT en cada petición saliente.
 * - Obtiene el token usando AuthService.
 * - Si existe, clona la petición y añade el header Authorization.
 * - Si no, envía la petición original sin modificaciones.
 * 
 * @param req  Petición HTTP original
 * @param next Función para continuar el flujo con la petición (modificada o no)
 * @returns Un Observable con el evento HTTP (petición/respuesta)
 */
export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): any /* Observable<HttpEvent<unknown>> */ => {
  // Inyectar AuthService para obtener el token almacenado
  const token = inject(AuthService).token;

  // Si se encuentra un token válido, clonamos la petición y añadimos Authorization
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  // Procesar la petición (modificada o no) y retornar su flujo
  return next(authReq);
};
