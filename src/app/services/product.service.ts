// ─── src/app/services/product.service.ts

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Interfaz que representa la estructura de un producto.
 */
export interface Producto {
  /** Identificador único del producto */
  id: number;
  /** Nombre descriptivo del producto */
  nombre: string;
  /** Detalle o descripción extendida del producto */
  descripcion: string;
  /** Precio del producto en formato numérico */
  precio: number;
}

/**
 * Servicio encargado de gestionar las operaciones CRUD de productos
 * mediante llamadas HTTP al backend de NodeJS/Express.
 */
@Injectable({ providedIn: 'root' })
export class ProductService {
  /** Ruta base del endpoint de productos en el servidor */
  private base = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  /**
   * Obtiene la lista completa de productos.
   * @returns Observable con array de productos
   */
  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.base);
  }

  /**
   * Obtiene un producto por su ID.
   * @param id - ID del producto a consultar
   * @returns Observable con un producto
   */
  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.base}/${id}`);
  }

  /**
   * Crea un nuevo producto en el servidor.
   * @param p - Objeto con nombre, descripción y precio (sin ID)
   * @returns Observable con el resultado de la creación
   */
  create(p: Omit<Producto, 'id'>): Observable<any> {
    return this.http.post(this.base, p);
  }

  /**
   * Actualiza los datos de un producto existente.
   * @param id - ID del producto a actualizar
   * @param p - Campos a modificar (nombre, descripción, precio)
   * @returns Observable con el resultado de la actualización
   */
  update(id: number, p: Partial<Omit<Producto, 'id'>>): Observable<any> {
    return this.http.put(`${this.base}/${id}`, p);
  }

  /**
   * Elimina un producto por su ID.
   * @param id - ID del producto a eliminar
   * @returns Observable con el resultado de la eliminación
   */
  delete(id: number): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
