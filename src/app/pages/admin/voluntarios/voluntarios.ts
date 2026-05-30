import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-voluntarios',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './voluntarios.html',
})
export class Voluntarios implements OnInit {
  usuarios: any[] = [];

  constructor(private api: ApiService) {}

ngOnInit() {
  const token = localStorage.getItem('token') ?? '';

  this.api.get<any[]>('/admin/voluntarios', token)
    .subscribe(data => this.usuarios = data);
}

eliminar(id: number) {
  if (!confirm('¿Eliminar este usuario?')) return;

  const token = localStorage.getItem('token') ?? '';

  this.api.delete(`/admin/voluntarios/${id}`, token)
    .subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
    });
}
}