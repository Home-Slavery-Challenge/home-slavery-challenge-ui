import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    RouterOutlet,
    FooterComponent,
    HeaderComponent
  ],
  styleUrl: './app.component.css'
})
export class AppComponent {
}
