import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AnunciosService } from './anuncios.service';

export interface User {
  id: number;
  usuario: string;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  fecha_nacimiento: string;
  foto: string | null;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  private base = 'https://api.socivil.org/api';
  private baseOld = 'http://127.0.0.1:8000/api';

  user = signal<User | null>(
    JSON.parse(localStorage.getItem('user_data') || 'null')
  );

  isAdmin = signal<boolean>(
    localStorage.getItem('is_admin') === 'true'
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private anuncioService: AnunciosService
  ) {
    this.checkSession();
  }

  checkSession() {

    const token = localStorage.getItem('token');

    if (!token) {
      this.clearStorage();
      return;
    }

    this.http.get<{ user: User; is_admin: boolean }>(
      `${this.base}/user`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({
      next: res => {

        this.user.set(res.user);
        this.isAdmin.set(res.is_admin);

        localStorage.setItem(
          'user_data',
          JSON.stringify(res.user)
        );

        localStorage.setItem(
          'is_admin',
          res.is_admin.toString()
        );

      },
      error: () => {

        this.clearStorage();
        this.router.navigate(['/login']);

      }
    });

  }

  login(usuario: string, password: string) {

    return this.http.post<{
      user: User;
      is_admin: boolean;
      token: string;
    }>(
      `${this.base}/login`,
      { usuario, password },
      { withCredentials: true }
    ).pipe(

     tap(res => {

  localStorage.setItem('token', res.token);

  this.user.set(res.user);
  this.isAdmin.set(res.is_admin);

  localStorage.setItem('is_admin', res.is_admin.toString());
  localStorage.setItem('user_data', JSON.stringify(res.user));

  if (!res.is_admin) {
    this.anuncioService.getNoLeidos().subscribe();
  }

})

    );

  }

  logout() {

  this.anuncioService.actualizarNoLeidos(0);

  this.clearStorage();

  this.router.navigate(
    ['/'],
    { replaceUrl: true }
  );

}

private clearStorage() {

  localStorage.removeItem('token');
  localStorage.removeItem('is_admin');
  localStorage.removeItem('user_data');

  this.user.set(null);
  this.isAdmin.set(false);

  this.anuncioService.actualizarNoLeidos(0);
}

  registro(data: any) {

    return this.http.post(
      `${this.base}/registro`,
      data,
      { withCredentials: true }
    );

  }

  isLoggedIn(): boolean {

    return !!localStorage.getItem('token');

  }

  getCurrentUser() {

    return {
      user: this.user(),
      is_admin: this.isAdmin()
    };

  }

}