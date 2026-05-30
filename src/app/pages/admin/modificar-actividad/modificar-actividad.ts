import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-modificar-actividad',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './modificar-actividad.html',
})
export class ModificarActividad implements OnInit {
  actividades: any[] = [];
  editando: any = null;
  imagenFile: File | null = null;
  exitoMsg = '';

  constructor(private api: ApiService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.cargar();
  }

  cargar() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.api.get<any[]>('/admin/actividades', token)
      .subscribe((data) => {
        this.actividades = data
        this.cdr.detectChanges()
      }
    );

  }

  editar(a: any) {
    window.scrollTo(0, 0);
    this.editando = { ...a };
    this.cdr.markForCheck(); // 👈 CLAVE

  }

  onImagen(e: any) { 
    
    this.imagenFile = e.target.files[0];
    console.log(this.imagenFile)
  }

  guardar() {
    const fd = new FormData();
    fd.append('titulo', this.editando.titulo);
    fd.append('descripcion', this.editando.descripcion);
    fd.append('fecha', this.editando.fecha);
    if (this.imagenFile) fd.append('imagen', this.imagenFile);
    // Laravel necesita _method para PUT con FormData
    fd.append('_method', 'PUT');
    this.api.postForm(`/admin/actividades/${this.editando.id}`, fd).subscribe({
      next: () => { this.exitoMsg = 'Actividad actualizada'; this.editando = null; this.cargar(); },
      error: () => { }
    });
  }

  eliminar(id: number) {
    if (!confirm('¿Eliminar esta actividad?')) return;

    const token = localStorage.getItem('token');
    if (!token) return;

    this.api.delete(`/admin/actividades/${id}`, token)
      .subscribe(() => this.cargar());

  }
}