import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';
import {ClrDropdownModule, ClrIconModule} from '@clr/angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    ClrDropdownModule,
    ClrIconModule,
  ],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @Input({required: true}) light!: boolean;

  constructor(protected authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.authService.getToken()
  }

  handleLogout() {
    this.authService.signOut()
  }

  handleProfil() {
    this.router.navigate(['/profil/info']);
  }

  handleBoarding() {
    this.router.navigate(['/boarding']);
  }

}
