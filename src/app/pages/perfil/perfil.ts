import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { AnunciosService, Anuncio } from '../../services/anuncios.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './perfil.html',
})
export class Perfil implements OnInit {

  form: any = {};

  exito = '';

  mensajes: Anuncio[] = [];

  noLeidos = 0;

  imageUrl: string = '';
  cargandoImagen = false; 

  fotoFile: File | null = null;

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private http: HttpClient,
    private anunciosService: AnunciosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {

    const u = this.auth.user();

    if (u) {

      this.form = { ...u };

      this.cargarImagen(
        u?.foto?.replace('fotos/', '')
      );

    }

    // CARGAR MENSAJES
    this.anunciosService.cargarAnuncios().subscribe({

      next: (data) => {
        
        this.mensajes = data;

        this.noLeidos = data.filter(
          m => !m.leido
        ).length;

      },

      error: (err) => {

        console.error(
          'Error cargando anuncios:',
          err
        );

      }

    });

  }

  onFoto(event: any) {

    this.fotoFile = event.target.files[0];

  }

  guardar() {

    const fd = new FormData();

    Object.keys(this.form).forEach(k => {

      fd.append(k, this.form[k] ?? '');

    });

    if (this.fotoFile) {

      fd.append('foto', this.fotoFile);

    }

    this.api.postForm<any>(
      '/perfil/actualizar',
      fd
    ).subscribe({

      next: (res) => {

        this.exito =
          'Perfil actualizado correctamente';

        this.auth.user.set(res.user);

      }

    });

  }

  logout() {

    this.auth.logout();

  }

  cargarImagen(ruta: any) {

  this.cargandoImagen = true;

  const token = localStorage.getItem('token');

  this.http.get(
    `http://13.37.207.144:8000/api/fotos/${ruta}`,
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }
  ).subscribe({

    next: (res: any) => {

      this.imageUrl = res.imagen;

      this.cargandoImagen = false;

      this.cdr.detectChanges();
    },

    error: () => {

      this.cargandoImagen = false;

    }

  });

}

}
