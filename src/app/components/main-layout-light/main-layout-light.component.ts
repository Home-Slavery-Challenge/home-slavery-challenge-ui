import {Component} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-main-layout-light',
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './main-layout-light.component.html',
  styleUrl: './main-layout-light.component.css'
})
export class MainLayoutLightComponent {

}
