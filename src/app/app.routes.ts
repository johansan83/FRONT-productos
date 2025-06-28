// ─── src/app/app.routes.ts

import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { ProductsComponent } from './products/products.component';
import { authGuard } from './auth.guard';

/**
 * Configuración de rutas para la aplicación CRUD-productos con Angular.
 * Cada objeto representa una ruta, componente a renderizar, validaciones y título.
 */
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',             // Debe coincidir exactamente con la ruta vacía
    redirectTo: 'login',           // Redirige al login como ruta predeterminada
    title: 'Login - CRUD‑productos'
  },
  {
    path: 'login',
    component: LoginComponent,     // Muestra el componente de inicio de sesión
    title: 'Login - CRUD‑productos'
  },
  {
    path: 'products',
    component: ProductsComponent,  // Muestra la lista y gestión de productos
    canActivate: [authGuard],      // Solo accesible si el usuario está autenticado
    title: 'Productos - CRUD‑productos'
  },
  {
    path: '**',
    redirectTo: 'login',           // Ruta comodín: redirige siempre al login
    title: 'Login - CRUD‑productos'
  }
];
