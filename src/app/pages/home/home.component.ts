import { Component } from '@angular/core';
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon } from '@cds/core/icon';
import {ClrIconModule} from '@clr/angular';
ClarityIcons.addIcons(userIcon);

@Component({
  selector: 'app-home',
  imports: [
    ClrIconModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
