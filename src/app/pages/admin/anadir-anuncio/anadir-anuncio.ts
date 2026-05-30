import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AnunciosService } from '../../../services/anuncios.service';

@Component({
  selector: 'app-anadir-anuncio',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './anadir-anuncio.html'
})
export class AnadirAnuncio {
usuarios: any[] = [];
  titulo = '';
  descripcion = '';

  exito = '';
usuarioSeleccionado: number | null = null;
  constructor(
    private anunciosService: AnunciosService,
    private cdr : ChangeDetectorRef
  ) {}

publicar() {

  if (!this.titulo || !this.descripcion || !this.usuarioSeleccionado) return;
console.log(this.usuarioSeleccionado);
  this.anunciosService.agregarAnuncio({
    titulo: this.titulo,
    descripcion: this.descripcion,
    usuarios: [this.usuarioSeleccionado]
  }).subscribe({
    next: (res) => {
console.log("publicado");

      this.exito = 'Anuncio publicado correctamente';

      this.titulo = '';
      this.descripcion = '';
      this.usuarioSeleccionado = null;
      this.cdr.detectChanges()
    }
  });
}
  ngOnInit() {
  this.anunciosService.getUsuarios().subscribe(res => {
    this.usuarios = res;
  });
}

}