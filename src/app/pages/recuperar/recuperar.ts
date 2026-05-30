import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-recuperar',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './recuperar.html',
})
export class Recuperar {
  email = '';
  ok = false;
  error = '';

  constructor(private api: ApiService) {}

  submit() {
    this.error = '';
    this.api.post('/recuperar-contrasena', { email: this.email }).subscribe({
      next: () => this.ok = true,
      error: (err) => this.error = err.error?.message || 'Error al enviar el correo'
    });
  }
}