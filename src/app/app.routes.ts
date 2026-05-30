import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [ 
  {
path: 'buzon', loadComponent: () => import('./pages/buzon/buzon').then(m => m.BuzonComponent), canActivate: [authGuard]
},
  {
  path: 'admin/anuncios/nuevo',
  loadComponent: () =>
    import('./pages/admin/anadir-anuncio/anadir-anuncio')
      .then(m => m.AnadirAnuncio),
  canActivate: [adminGuard]
},
  { path: '', loadComponent: () => import('./pages/home/home').then(m => m.Home) },
  { path: 'actividades', loadComponent: () => import('./pages/actividades/actividades').then(m => m.Actividades) },
  { path: 'sobre-nosotros', loadComponent: () => import('./pages/sobre-nosotros/sobre-nosotros').then(m => m.SobreNosotros) },
  { path: 'contacto', loadComponent: () => import('./pages/contacto/contacto').then(m => m.Contacto) },
  { path: 'login', loadComponent: () => import('./pages/login/login').then(m => m.Login) },
  { path: 'registro', loadComponent: () => import('./pages/registro/registro').then(m => m.Registro) },
  { path: 'recuperar-contrasena', loadComponent: () => import('./pages/recuperar/recuperar').then(m => m.Recuperar) },
  { path: 'donar', loadComponent: () => import('./pages/donar/donar').then(m => m.Donar) },
  { path: 'donar/exito', loadComponent: () => import('./pages/donar/donar').then(m => m.DonarExito) },
  { path: 'donar/cancelado', loadComponent: () => import('./pages/donar/donar').then(m => m.DonarCancelado) },
  { path: 'aviso-legal', loadComponent: () => import('./pages/aviso-legal/aviso-legal').then(m => m.AvisoLegal) },
  { path: 'privacidad', loadComponent: () => import('./pages/privacidad/privacidad').then(m => m.Privacidad) },
  { path: 'cookies', loadComponent: () => import('./pages/cookies/cookies').then(m => m.Cookies) },
  { path: 'perfil', loadComponent: () => import('./pages/perfil/perfil').then(m => m.Perfil), canActivate: [authGuard] },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: '', loadComponent: () => import('./pages/admin/panel/panel').then(m => m.Panel) },
      { path: 'voluntarios', loadComponent: () => import('./pages/admin/voluntarios/voluntarios').then(m => m.Voluntarios) },
      { path: 'actividades/agregar', loadComponent: () => import('./pages/admin/agregar-actividad/agregar-actividad').then(m => m.AgregarActividad) },
      { path: 'actividades/modificar', loadComponent: () => import('./pages/admin/modificar-actividad/modificar-actividad').then(m => m.ModificarActividad) },
    ]
  },
  { path: '**', redirectTo: '' }
  
];