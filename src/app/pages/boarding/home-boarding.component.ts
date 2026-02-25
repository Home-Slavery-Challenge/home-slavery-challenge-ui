import {Component} from '@angular/core';
import {ClrDatagridModule, ClrIconModule, ClrModalModule} from '@clr/angular';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-boarding',
  imports: [
    ClrIconModule,
    ClrModalModule,
    ClrDatagridModule,
    RouterOutlet
  ],
  templateUrl: './home-boarding.component.html',
  styleUrl: './home-boarding.component.css'
})
export class HomeBoardingComponent {

}
