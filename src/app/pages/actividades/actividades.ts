import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-actividades',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './actividades.html',
})
export class Actividades implements OnInit {

  actividades: any[] = [];
  mensaje = '';
  imagen: any[] = [];

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades(): void {

    const token = localStorage.getItem('token') || '';

    this.api.get<any[]>('/actividades', token)

      .subscribe({

        next: (data) => {

          this.actividades = data;

          for (let actividad of this.actividades) {

            actividad.cargandoImagen = true;

            console.log(actividad);
            console.log(token);

            this.api.get<any[]>(
              `/actividades${actividad.imagen_url.replace("actividades/", "")}`,
              token
            )

            .subscribe({

              next: (res: any) => {

                console.log(res.imagen);

                actividad.imagen_url = res.imagen;

                this.cdr.detectChanges();
              },

              error: (err) => {

                console.error(err);

                actividad.cargandoImagen = false;
              }
            });
          }
        },

        error: (err) => {
          console.error(err);
        }
      });
  }

apuntarse(id: number): void {

  this.api.post('/actividades/apuntarse', {
    id_actividad: id
  })

  .subscribe({

    next: () => {

      this.mensaje = 'inscrito';

      const actividad = this.actividades.find(a => a.id === id);

      if (actividad) {

        actividad.ya_inscrito = true;
        actividad.plazas_ocupadas++;

        // GUARDAR EN LOCALSTORAGE
        const apuntadas =
          JSON.parse(localStorage.getItem('actividades_apuntadas') || '[]');

        if (!apuntadas.includes(id)) {

          apuntadas.push(id);

          localStorage.setItem(
            'actividades_apuntadas',
            JSON.stringify(apuntadas)
          );
        }
      }
    },

    error: (err) => {

      if (err.error?.message === 'ya_inscrito') {

        this.mensaje = 'ya_inscrito';

      } else if (err.error?.message === 'completo') {

        this.mensaje = 'completo';

      } else {

        this.mensaje = 'error';
      }
    }
  });
}


}