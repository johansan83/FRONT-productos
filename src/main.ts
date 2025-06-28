// ─── src/main.ts

import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { jwtInterceptor } from './app/interceptors/jwt.interceptor';

/**
 * Punto de entrada de la aplicación Angular (Standalone API).
 * Se inicializa la app vinculando el componente raíz `AppComponent`.
 * Aquí se configuran:
 * - Routing (rutas definidas con `provideRouter`)
 * - Cliente HTTP con interceptor JWT (`provideHttpClient`)
 */
bootstrapApplication(AppComponent, {
  providers: [
    // Configuración del enrutador con las rutas definidas
    provideRouter(routes),

    // Cliente HTTP con interceptor que añade token JWT si existe
    provideHttpClient(
      withInterceptors([jwtInterceptor])
    )
  ]
}).catch(err => console.error('Error al iniciar la app', err));
