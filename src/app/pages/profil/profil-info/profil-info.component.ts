import {Component, OnInit} from '@angular/core';
import {ClrInputModule} from '@clr/angular';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-profil-info',
  imports: [
    ClrInputModule,
    FormsModule
  ],
  templateUrl: './profil-info.component.html',
  styleUrl: './profil-info.component.css'
})
export class ProfilInfoComponent implements OnInit {
  input = '';
  username = ""

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.username = this.authService.loggedUser!
  }
}
