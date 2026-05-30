import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { AuthService } from './services/auth.service';
import { Footer } from './components/footer/footer';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
})
export class App implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.checkSession();
  }
}