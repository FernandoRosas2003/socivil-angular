import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-agregar-actividad',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './agregar-actividad.html',
})
export class AgregarActividad {
  form = { titulo:'', descripcion:'', fecha:'', plazas_max:'' };
  imagen: File | null = null;
  exito = false;
  error = '';

  constructor(private api: ApiService) {}

  onImagen(e: any) { this.imagen = e.target.files[0]; }

  crear() {
    const fd = new FormData();
    Object.entries(this.form).forEach(([k,v]) => fd.append(k, v));
    if (this.imagen) fd.append('imagen', this.imagen);
    this.api.postForm('/admin/actividades', fd).subscribe({
      next: () => this.exito = true,
      error: (err) => this.error = err.error?.message || 'Error al crear la actividad'
    });
  }
}