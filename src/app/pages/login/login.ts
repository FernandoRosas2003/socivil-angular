import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login implements OnInit {
  usuario = '';
  password = '';
  error = '';
  cargando = false; // Controla el spinner

  constructor(public auth: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.auth.isLoggedIn()) {
      this.redirigirUsuario();
    }
  }

  submit() {
    this.error = '';
    this.cargando = true; // Empieza la carga

    this.auth.login(this.usuario, this.password).subscribe({
      next: (res) => {
        this.cargando = false;
        this.redirigirUsuario();
      },
      error: () => {
        this.error = 'Usuario o contraseña incorrectos';
        this.cargando = false; // Para la carga si hay error
      }
    });
  }

  private redirigirUsuario() {
    const user = this.auth.getCurrentUser(); 
    if (user && user.is_admin) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/']);
    }
  }
}