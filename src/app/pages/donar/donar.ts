import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-donar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './donar.html',
})
export class Donar {
  cantidadSeleccionada: number = 0;
  cargando: boolean = false;

  constructor(private api: ApiService) {}

  seleccionar(c: number) {
    this.cantidadSeleccionada = c;
  }

  pagar() {
    if (!this.cantidadSeleccionada || this.cantidadSeleccionada < 1) return;

    this.cargando = true;
    this.api.post<{ url: string }>('/donar/procesar', { cantidad: this.cantidadSeleccionada })
      .subscribe({
        next: (res) => {
          console.log(res);
          // Redirige al usuario a la página de pago de Stripe
          window.location.href = res.url;
        },
        error: (err) => {
          this.cargando = false;
          console.error('Error al conectar con Stripe', err);
          alert('Hubo un error al procesar el pago.');
        }
      });
  }
}

// Componente para la vista de éxito
@Component({
  selector: 'app-donar-exito',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="donation" style="padding: 80px 20px; display: flex; justify-content: center;">
      <div class="donation-container" style="max-width: 500px; width: 100%; background: #ffffff; padding: 50px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center;">
        <h2 style="margin-bottom: 25px; font-size: 2.2rem; color: #333; line-height: 1.2;">¡Gracias por tu donación! ❤️</h2>
        <p style="margin-bottom: 35px; font-size: 1.15rem; line-height: 1.7; color: #555;">
          Tu pago se ha completado correctamente y nos ayudará a seguir adelante con nuestros proyectos.
        </p>
        <a routerLink="/donar" class="btn btn-red" style="padding: 14px 40px; font-weight: bold; text-decoration: none; display: inline-block; border-radius: 8px;">Volver</a>
      </div>
    </section>
  `
})
export class DonarExito {}

// Componente para la vista de cancelado
@Component({
  selector: 'app-donar-cancelado',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="donation" style="padding: 80px 20px; display: flex; justify-content: center;">
      <div class="donation-container" style="max-width: 500px; width: 100%; background: #ffffff; padding: 50px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); text-align: center;">
        <h2 style="margin-bottom: 25px; font-size: 2.2rem; color: #333; line-height: 1.2;">Pago cancelado</h2>
        <p style="margin-bottom: 35px; font-size: 1.15rem; line-height: 1.7; color: #555;">
          No se ha realizado ningún cargo en tu tarjeta. Si tuviste algún problema, puedes intentarlo de nuevo.
        </p>
        <a routerLink="/donar" class="btn btn-red" style="padding: 14px 40px; font-weight: bold; text-decoration: none; display: inline-block; border-radius: 8px;">Intentar de nuevo</a>
      </div>
    </section>
  `
})
export class DonarCancelado {}