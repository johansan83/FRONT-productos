// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private url = 'http://localhost:3000/auth/login';
  
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<{ token: string }>(this.url, { email, password })
      .pipe(
        tap(res => localStorage.setItem('jwt', res.token))
      );
  }

  get token(): string | null {
    return localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
  }

  isAuthenticated(): boolean {
    const token = this.token;
    // Podrías usar @auth0/angular-jwt para validar expiración :contentReference[oaicite:1]{index=1}
    return !!token;
  }
}
