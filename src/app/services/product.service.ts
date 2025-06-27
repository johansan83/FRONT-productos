// src/app/services/product.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Producto { id: number; nombre: string; descripcion: string; precio: number; }

@Injectable({ providedIn: 'root' })
export class ProductService {
  private base = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Producto[]> { return this.http.get<Producto[]>(this.base); }
  getById(id: number): Observable<Producto> { return this.http.get<Producto>(`${this.base}/${id}`); }
  create(p: Omit<Producto, 'id'>): Observable<any> { return this.http.post(this.base, p); }
  update(id: number, p: Partial<Omit<Producto, 'id'>>): Observable<any> { return this.http.put(`${this.base}/${id}`, p); }
  delete(id: number): Observable<any> { return this.http.delete(`${this.base}/${id}`); }
}
