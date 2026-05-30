import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contacto.html',
})
export class Contacto {
  form = { nombre: '', email: '', mensaje: '' };
  ok = false;

  constructor(private api: ApiService) {}

  enviar() {
    this.api.post('/contacto', this.form).subscribe({
      next: () => { this.ok = true; this.form = { nombre:'', email:'', mensaje:'' }; },
      error: () => {}
    });
  }
}