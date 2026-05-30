import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cookies',
  standalone: true,
  imports: [FormsModule],
  template: `
    <section class="hero" style="height:55vh;min-height:320px;position:relative;overflow:hidden;">
      <img src="cookies.jpg" alt="Cookies" class="hero-img">
      <div class="hero-overlay"></div>
      <div class="hero-content"><h1>Configuración de Cookies</h1><p>Gestiona tus preferencias de privacidad</p></div>
    </section>
    <section class="services">
      <h2>Gestiona tus preferencias</h2>
      <div style="max-width:900px;margin:0 auto;display:flex;flex-direction:column;gap:15px;">
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px;border:1px solid #ddd;border-radius:10px;background:#fff;">
          <div><h3>Cookies esenciales</h3><p style="color:#555;font-size:.95rem">Necesarias para el funcionamiento básico.</p></div>
          <input type="checkbox" checked disabled>
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px;border:1px solid #ddd;border-radius:10px;background:#fff;">
          <div><h3>Cookies de análisis</h3><p style="color:#555;font-size:.95rem">Nos ayudan a entender cómo interactúan los usuarios.</p></div>
          <input type="checkbox" [(ngModel)]="analytics">
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px;border:1px solid #ddd;border-radius:10px;background:#fff;">
          <div><h3>Cookies de personalización</h3><p style="color:#555;font-size:.95rem">Permiten recordar tus preferencias.</p></div>
          <input type="checkbox" [(ngModel)]="personalization">
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;padding:18px;border:1px solid #ddd;border-radius:10px;background:#fff;">
          <div><h3>Cookies de marketing</h3><p style="color:#555;font-size:.95rem">Se usan para mostrar anuncios relevantes.</p></div>
          <input type="checkbox" [(ngModel)]="marketing">
        </div>
      </div>
    </section>
    <section class="cta">
      <h2>Guardar configuración</h2>
      <p>Puedes guardar tus preferencias en cualquier momento.</p>
      <button class="btn btn-white" (click)="save()">Guardar preferencias</button>
      @if (saved) { <p style="margin-top:10px;font-size:14px;">✅ Preferencias guardadas</p> }
    </section>
    <style>
/* ===== GLOBAL RESET ===== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', sans-serif;
  background: #f5f7fb;
  color: #111827;
}

/* ===== HERO (estilo oscuro + overlay como otras páginas) ===== */
.hero {
  position: relative;
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
  filter: brightness(0.7);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: rgba(17, 24, 39, 0.65);
}

.hero-content {
  position: absolute;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 20px;
}

.hero-content h1 {
  font-size: 52px;
  font-weight: 800;
  margin-bottom: 10px;
}

.hero-content p {
  font-size: 18px;
  opacity: 0.9;
}

/* ===== SECTION ===== */
.services {
  padding: 80px 20px;
  text-align: center;
}

.services h2 {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 40px;
  color: #111827;
  position: relative;
}

/* línea roja como en footer */
.services h2::after {
  content: '';
  width: 60px;
  height: 4px;
  background: #cc0000;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px;
}

/* ===== COOKIE CONTAINER ===== */
.services > div {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

/* ===== COOKIE CARD (nuevo estilo más premium) ===== */
.services > div > div {
  display: flex;
  justify-content: space-between;
  align-items: center;

  background: white;
  padding: 22px;
  border-radius: 16px;

  border: 1px solid rgba(0,0,0,0.06);
  box-shadow: 0 12px 30px rgba(0,0,0,0.05);

  transition: 0.3s ease;
  text-align: left;
}

.services > div > div:hover {
  transform: translateY(-4px);
}

/* títulos cookies */
.services h3 {
  font-size: 18px;
  font-weight: 800;
  color: #cc0000;
  margin-bottom: 5px;
}

/* descripción */
.services p {
  font-size: 14px;
  color: #6b7280;
}

/* checkbox estilo moderno */
input[type="checkbox"] {
  width: 20px;
  height: 20px;
  accent-color: #cc0000;
  cursor: pointer;
}

/* ===== CTA ===== */
.cta {
  background: linear-gradient(135deg, #111827, #1f2937);
  color: white;
  text-align: center;
  padding: 90px 20px;
}

.cta h2 {
  font-size: 42px;
  font-weight: 800;
  margin-bottom: 15px;
}

.cta p {
  font-size: 18px;
  opacity: 0.9;
  margin-bottom: 25px;
}

/* ===== BUTTON ===== */
.btn {
  padding: 14px 28px;
  border-radius: 12px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}

.btn-white {
  background: white;
  color: #cc0000;
}

.btn-white:hover {
  transform: translateY(-3px);
  background: #f3f4f6;
}

/* ===== SAVED MSG ===== */
.cta p:last-child {
  margin-top: 12px;
  font-size: 14px;
  color: #d1d5db;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {

  .hero-content h1 {
    font-size: 36px;
  }

  .hero-content p {
    font-size: 15px;
  }

  .services h2 {
    font-size: 30px;
  }

  .services > div > div {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .cta h2 {
    font-size: 32px;
  }
}

</style>
  `
})
export class Cookies {
  analytics = false;
  personalization = false;
  marketing = false;
  saved = false;

  save() {
    localStorage.setItem('cookieSettings', JSON.stringify({
      analytics: this.analytics,
      personalization: this.personalization,
      marketing: this.marketing,
    }));
    this.saved = true;
  }
}