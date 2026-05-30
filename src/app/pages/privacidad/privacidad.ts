import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacidad',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero" style="height:55vh;min-height:320px;position:relative;overflow:hidden;">
      <img src="privacidad.jpg" alt="Privacidad" class="hero-img">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Política de Privacidad</h1>
        <p>Protección de datos personales de los usuarios</p>
      </div>
    </section>

    <section class="services legal">
      <h2>Tratamiento de Datos</h2>

      <p class="services-desc">
        En Socivil España nos comprometemos a proteger la privacidad de nuestros usuarios y garantizar el cumplimiento de la normativa vigente en materia de protección de datos.
      </p>

      <div class="about-container" style="max-width:900px;margin:0 auto;text-align:left;">
        <ul class="data-list">
          <li><strong>Responsable del tratamiento:</strong> Socivil España, encargada de la gestión de los datos personales.</li>
          <li><strong>Finalidad:</strong> Gestión de usuarios registrados, donaciones y participación en actividades organizadas por la ONG.</li>
          <li><strong>Datos recopilados:</strong> Nombre, correo electrónico y datos necesarios para la gestión de servicios ofrecidos.</li>
          <li><strong>Legitimación:</strong> Consentimiento del usuario y ejecución de los servicios solicitados.</li>
          <li><strong>Conservación:</strong> Los datos se conservarán mientras exista relación con el usuario o por obligación legal.</li>
          <li><strong>Derechos:</strong> Puedes acceder, rectificar o eliminar tus datos enviando un correo a secretaria.socivil@gmail.com.</li>
        </ul>
      </div>
    </section>

    <section class="services legal">
      <h2>Seguridad y Protección</h2>

      <p class="services-desc">
        Aplicamos medidas de seguridad para proteger la información personal frente a accesos no autorizados o usos indebidos.
      </p>

      <div class="service-cards">
        <div class="card">
          <h3>Seguridad</h3>
          <p>Implementamos medidas técnicas y organizativas adecuadas para garantizar la seguridad de los datos personales.</p>
        </div>

        <div class="card">
          <h3>Confidencialidad</h3>
          <p>Nos comprometemos a tratar los datos con total confidencialidad y a no cederlos a terceros sin consentimiento.</p>
        </div>

        <div class="card">
          <h3>Cookies</h3>
          <p>Este sitio web puede utilizar cookies para mejorar la experiencia del usuario. Puedes configurar su uso en tu navegador.</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <h2>¿Quieres saber más sobre tus datos?</h2>
      <p>Contacta con nosotros para cualquier consulta relacionada con privacidad</p>
      <a routerLink="/contacto" class="btn btn-white">Contacta con Nosotros</a>
    </section>

    <style>

/* ===== GENERAL ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background: #f5f7fb;
  color: #111827;
  text-align: center;
}

/* ===== HERO ===== */
.hero {
  position: relative;
  width: 100%;
  height: 55vh;
  min-height: 320px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.55);
}

.hero-content {
  position: absolute;
  z-index: 2;
  color: white;
  text-align: center;
  padding: 20px;
}

.hero-content h1 {
  font-size: 55px;
  font-weight: 800;
  margin-bottom: 10px;
}

.hero-content p {
  font-size: 18px;
  opacity: 0.95;
}

/* ===== SECTIONS ===== */
.services {
  padding: 80px 20px;
  background: #f5f7fb;
}

.services h2 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 20px;
}

.services-desc {
  max-width: 750px;
  margin: auto;
  margin-bottom: 40px;
  color: #6b7280;
  font-size: 18px;
  line-height: 1.6;
}

/* ===== LISTA DATOS (MÁS SEPARACIÓN) ===== */
.data-list {
  padding-left: 20px;
}

.data-list li {
  margin-bottom: 18px; /* 👈 MÁS SEPARACIÓN ENTRE PUNTOS */
  color: #4b5563;
  line-height: 1.7;
}

/* ===== CARDS CENTRADAS ===== */
.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1100px;

  /* 👇 CENTRADO REAL */
  margin: 0 auto;
  justify-content: center;
  align-items: stretch;
}

.card {
  background: white;
  padding: 35px;
  border-radius: 22px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  transition: 0.3s;
  text-align: left;
}

.card:hover {
  transform: translateY(-8px);
}

.card h3 {
  color: #cc0000;
  font-size: 22px;
  margin-bottom: 15px;
  font-weight: 800;
}

.card p {
  color: #4b5563;
  line-height: 1.6;
}

/* ===== CTA ===== */
.cta {
  background: linear-gradient(135deg, #cc0000, #990000);
  color: white;
  text-align: center;
  padding: 90px 20px;
}

.cta h2 {
  font-size: 46px;
  font-weight: 800;
  margin-bottom: 20px;
}

.cta p {
  font-size: 18px;
  margin-bottom: 30px;
  opacity: 0.95;
}

/* ===== BUTTON ===== */
.btn {
  padding: 15px 28px;
  border-radius: 14px;
  font-weight: 700;
  text-decoration: none;
  display: inline-block;
  transition: 0.3s;
}

.btn-white {
  background: white;
  color: #cc0000;
}

.btn-white:hover {
  background: #f3f4f6;
  transform: translateY(-3px);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {

  .hero-content h1 {
    font-size: 38px;
  }

  .hero-content p {
    font-size: 16px;
  }

  .services h2 {
    font-size: 32px;
  }

  .cta h2 {
    font-size: 32px;
  }
}

</style>
  `
})
export class Privacidad {}