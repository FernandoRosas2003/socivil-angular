import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

import {
  AnunciosService,
  Anuncio
} from '../../services/anuncios.service';

@Component({
  selector: 'app-buzon',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule
  ],
  templateUrl: './buzon.html'
})
export class BuzonComponent implements OnInit {

  anuncios: Anuncio[] = [];

  constructor(
    public anunciosService: AnunciosService
  ) {}

  ngOnInit(): void {

    this.anunciosService
      .cargarAnunciosYLeerTodos()
      .subscribe({

        next: (data) => {

          this.anuncios = data;

        },

        error: (err) => {

          console.error(
            'Error cargando anuncios:',
            err
          );

        }

      });

  }

}