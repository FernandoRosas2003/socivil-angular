import { ChangeDetectorRef, Component, OnInit, effect } from '@angular/core';
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

  constructor(
  public auth: AuthService,
  private http: HttpClient,
  private cdr: ChangeDetectorRef,
  public anuncioService: AnunciosService
) {

effect(() => {

  const usuario = this.auth.user();

  if (!usuario) {
    this.imageUrl = '';
    return;
  }

  if (usuario.foto) {
    this.cargarImagen(usuario.foto);
  }

});

}

 ngOnInit() {

  if (this.auth.isAdmin()) {
    return;
  }

  this.anuncioService.noLeidos$.subscribe({
    next: (cantidad) => {
      this.noLeidos = cantidad;
    }
  });

  this.anuncioService.getNoLeidos().subscribe();
}

cargarImagen(ruta: string) {

  this.cargandoImagen = true;

  const token = localStorage.getItem('token');

  this.http.get(
    `https://api.socivil.org/api/fotos/${ruta}`,
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