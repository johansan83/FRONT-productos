// ─── src/app/app.config.ts

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * Configuración global de la aplicación Angular.
 * Define providers y opciones que se aplican a toda la app.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * 📦 Configuración de detección de cambios optimizada:
     * - `eventCoalescing: true` agrupa múltiples eventos en una sola ejecución de CD
     *   para mejorar el rendimiento en escenarios de alta interacción.
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Configuración del router con las rutas definidas en `routes`.
     * Permite navegación de tipo SPA sin módulos tradicionales.
     */
    provideRouter(routes)
  ]
};
