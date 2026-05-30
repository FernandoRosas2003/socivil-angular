import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [RouterLink],
  template: `
<section class="admin-hero">
  <div class="admin-container">

    <h2>Panel de Administración</h2>
    <p>Gestiona voluntarios y actividades desde aquí</p>

    <div class="admin-grid">

      <a routerLink="/admin/voluntarios" class="admin-card red">
        <h3>Eliminar Voluntario</h3>
        <p>Gestiona usuarios registrados</p>
      </a>

      <a routerLink="/admin/actividades/agregar" class="admin-card blue">
        <h3>Agregar Actividad</h3>
        <p>Crea nuevas actividades</p>
      </a>

      <a routerLink="/admin/actividades/modificar" class="admin-card green">
        <h3>Modificar Actividad</h3>
        <p>Edita actividades existentes</p>
      </a>
<a routerLink="/admin/anuncios/nuevo" class="admin-card orange">
  <h3>Añadir Anuncio</h3>
  <p>Enviar anuncio a usuarios</p>
</a>
    </div>

    <button class="btn btn-red logout-btn" (click)="logout()">
      Cerrar Sesión
    </button>

  </div>
</section>

`

})
export class Panel {
  constructor(private auth: AuthService) {}
  logout() { this.auth.logout() }
}

