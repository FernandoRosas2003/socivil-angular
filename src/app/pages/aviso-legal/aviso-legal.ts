import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-aviso-legal',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="hero" style="height:55vh;min-height:320px;position:relative;overflow:hidden;">
      <img src="aviso-legal.png" alt="Aviso Legal" class="hero-img">
      <div class="hero-overlay"></div>
      <div class="hero-content"><h1>Aviso Legal</h1><p>Información legal y condiciones de uso</p></div>
    </section>
    <section class="services legal">
    <h2>Información General</h2>
    <p class="services-desc">
        En cumplimiento con la legislación vigente, se facilitan a continuación los datos identificativos del titular de este sitio web.
    </p>

    <div class="service-cards">
        <div class="card">
            <h3>Titular del sitio web</h3>
            <p>
                <strong>Nombre:</strong> Socivil España<br>
                <strong>Entidad:</strong> Organización Española para el Desarrollo de la Sociedad Civil<br>
                <strong>Email:</strong> secretaria.socivil@gmail.com
            </p>
        </div>

        <div class="card">
            <h3>Condiciones de uso</h3>
            <p>
                El acceso y uso de este sitio web implica la aceptación plena de las presentes condiciones.
                El usuario se compromete a hacer un uso adecuado de los contenidos.
            </p>
        </div>

        <div class="card">
            <h3>Propiedad intelectual</h3>
            <p>
                Todos los contenidos son propiedad de Socivil España o cuentan con licencia para su uso.
                Queda prohibida su reproducción sin autorización.
            </p>
        </div>
    </div>
</section>
    <section class="cta">
      <h2>¿Tienes alguna duda legal?</h2>
      <p>Puedes contactar con nosotros para más información</p>
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

/* ===== SERVICES (LEGAL) ===== */
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
  margin-bottom: 50px;
  color: #6b7280;
  font-size: 18px;
  line-height: 1.6;
}

/* ===== CARDS ===== */
.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 320px));
  gap: 30px;
  max-width: 1200px;
  margin: auto;
  justify-content: center;
}

.card {
  background: white;
  padding: 35px;
  border-radius: 22px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
  
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
export class AvisoLegal {}

