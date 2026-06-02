import { Injectable, signal } from '@angular/core';
import { ApiService } from './api.service';
import { HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { of } from 'rxjs';

export interface Anuncio {
  id: number;
  titulo: string;
  descripcion: string;
  leido: number; // viene como 0 o 1
}

@Injectable({ providedIn: 'root' })
export class AnunciosService {

  private noLeidosSubject = new BehaviorSubject<number>(0);

  // Observable público
  noLeidos$ = this.noLeidosSubject.asObservable();


  constructor(private api: ApiService) {}

 cargarAnuncios() {
    const token = localStorage.getItem('token');
 
    const headers = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
 
    return this.api.get<Anuncio[]>('/anuncios', token ?? undefined).pipe(
      map(anuncios => anuncios)
    );
  }

 cargarAnunciosYLeerTodos() {
    const token = localStorage.getItem('token');
 
    const headers = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
    this.actualizarNoLeidos(0);
    return this.api.get<Anuncio[]>('/anuncios/obtenerYLeerTodos', token ?? undefined).pipe(
      map(anuncios => anuncios)
    );
  }

  noLeidos() {
    return this.api.get<number>('/anuncios-no-leidos');
  }

  marcarLeido(id: number) {
    return this.api.patch(`/anuncios/${id}/leido`, {});
  }

  agregarAnuncio(data: {
    titulo: string;
    descripcion: string;
    usuarios: number[];
  }) {
    return this.api.post<any>('/anuncios', data);
  }

  getUsuarios() {
    const token = localStorage.getItem('token');
    return this.api.get<any[]>('/admin/voluntarios', token ?? undefined);
  }

   getNoLeidos(): Observable<number> {
  const token = localStorage.getItem('token');
  if (!token) {
    return of(0);
  }
  return this.api.get<number>(
    '/anuncios-no-leidos',
    token
  ).pipe(
    tap(cantidad => {
      this.noLeidosSubject.next(cantidad);
    })
  );
}
  actualizarNoLeidos(cantidad: number): void {
    this.noLeidosSubject.next(cantidad);
  }

  obtenerValorActual(): number {
    return this.noLeidosSubject.value;
  }
}