import { Component } from '@angular/core';
import {ClrInputModule} from '@clr/angular';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-profil-info',
  imports: [
    ClrInputModule,
    FormsModule
  ],
  templateUrl: './profil-info.component.html',
  styleUrl: './profil-info.component.css'
})
export class ProfilInfoComponent {
  input = '';

}
