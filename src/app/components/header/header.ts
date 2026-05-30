import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { AnunciosService } from '../../services/anuncios.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
})
export class Header implements OnInit {

  imageUrl: string = '';
  cargandoImagen = false;
  noLeidos : number = 0;

  constructor(public auth: AuthService, private http: HttpClient, private cdr: ChangeDetectorRef, public anuncioService : AnunciosService) {}

  ngOnInit() {
     this.anuncioService.noLeidos$.subscribe({
      next: (cantidad) => {
        this.noLeidos = cantidad;
      }
    });

    // Cargar desde backend una sola vez
    this.anuncioService.getNoLeidos().subscribe();
    const foto = this.auth.user()?.foto;
    if (foto) {
      this.cargarImagen(foto);
    }
  }

cargarImagen(ruta: string) {

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

  logout() {
    this.auth.logout();
  }

cargarNoLeidos(): void {
    this.anuncioService.getNoLeidos().subscribe({
      next: (cantidad) => {
        console.log(this.noLeidos);
        
        this.noLeidos = cantidad;
      },
      error: (err) => {
        console.error('Error al obtener anuncios no leídos', err);
      }
    });
  }
 
}