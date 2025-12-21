import {Component, OnInit} from '@angular/core';
import {ClrIconModule, ClrVerticalNavModule} from '@clr/angular';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {InfoSection, sectionInfo} from './const';


@Component({
  selector: 'app-profil',
  imports: [
    ClrIconModule,
    ClrVerticalNavModule,
    RouterOutlet,
    RouterLinkActive,
    RouterLink
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})


export class ProfilComponent implements OnInit {

  sectionArray: InfoSection[] = [];

  constructor() {}

  ngOnInit(): void {
    this.sectionArray = sectionInfo;
  }

}
