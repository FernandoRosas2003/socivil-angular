  import { Component } from '@angular/core';
  import { FormsModule } from '@angular/forms';
  import { RouterLink } from '@angular/router';
  import { AuthService } from '../../services/auth.service';

  @Component({
    selector: 'app-registro',
    standalone: true,
    imports: [FormsModule, RouterLink],
    templateUrl: './registro.html',
  })
  export class Registro {
    form = { usuario:'', nombre:'', apellido:'', password:'', email:'', telefono:'', fecha_nacimiento:'' };
    error = '';
    exito = false;
    cargando = false; // Control del spinner

    constructor(private auth: AuthService) {}

    submit() {
      this.error = '';
      this.cargando = true; // Iniciar animación

      this.auth.registro(this.form).subscribe({
        next: () => {
          this.exito = true;
          this.cargando = false;
        },
        error: (err) => {
          this.error = err.error?.message || Object.values(err.error?.errors || {})[0] as string || 'Error en el registro';
          this.cargando = false; // Detener animación en caso de error
        }
      });
    }
  }