import { Component } from '@angular/core';
import {ClrIconModule, ClrVerticalNavModule} from '@clr/angular';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-profil',
  imports: [
    ClrIconModule,
    ClrVerticalNavModule,
    RouterOutlet
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {

}
