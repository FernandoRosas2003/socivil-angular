import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private base_old = 'http://127.0.0.1:8000/api';
  private base = 'https://api.socivil.org/api';

  constructor(private http: HttpClient) {}

get<T>(path: string, token?: string): Observable<T> {
  let headers = new HttpHeaders();

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return this.http.get<T>(`${this.base}${path}`, { headers });
}

 post<T>(path: string, body: any): Observable<T> {

  const token = localStorage.getItem('token');

 const headers = new HttpHeaders({
  Authorization: `Bearer ${token ?? ''}`
});

  return this.http.post<T>(
    `${this.base}${path}`,
    body,
    { headers }
  );
}

 postForm<T>(path: string, form: FormData): Observable<T> {
  const token = localStorage.getItem('token');

 let headers = new HttpHeaders();

  if (token) {
    headers = headers.set('Authorization', `Bearer ${token}`);
  }

  return this.http.post<T>(`${this.base}${path}`, form, { headers });
}
  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.base}${path}`, body);
  }

delete<T>(path: string, token: string): Observable<T> {
  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.delete<T>(`${this.base}${path}`, { headers });
}
patch<T>(path: string, body: any): Observable<T> {
  const token = localStorage.getItem('token');

  return this.http.patch<T>(
    `${this.base}${path}`,
    body,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
}
}