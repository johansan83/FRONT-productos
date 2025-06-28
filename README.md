# 🛠️ FRONT‑productos (Angular 20)

Interfaz web para consumir la API de productos (NodeJS + Express + MySQL) con autenticación JWT.

---

## 📋 Características

- **Login** con validación de JWT.
- **CRUD de productos**: listar, crear, editar y eliminar.
- **UI responsiva** con Bootstrap 5.
- **Protección de rutas** mediante guardias (`authGuard`).
- **Interfaz moderna** utilizando Angular 20 con API standalone.
- **Interceptors** para inyectar token JWT en peticiones HTTP.

---

## 📦 Requisitos

- Node.js (>=22.16)
- Angular CLI 20

---

Instalacion

Clona el repositorio y navega al directorio:
git clone https://github.com/johansan83/FRONT-productos.git
cd FRONT-productos
npm install


Desplegar proyecto
cd FRONT-productos
ng serve

Estructura del proyecto
src/
 ├── app/
 │    ├── auth/             # Login
 │    ├── products/         # Componente de gestión de productos
 │    ├── services/         # Servicios HTTP (auth y productos)
 │    ├── interceptors/     # Interceptor para JWT
 │    ├── auth.guard.ts     # Guardia de ruta
 │    ├── app.routes.ts     # Configuración de rutas
 │    └── app.component.ts  # Componente y navbar principal
 ├── index.html             # Punto de entrada HTML
 ├── main.ts                # Bootstrap de Angular standalone
 └── styles.css             # Estilos globales (incluye Bootstrap)
