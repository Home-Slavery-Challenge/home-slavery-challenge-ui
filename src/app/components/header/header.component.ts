import {Component, Input, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  @Input({required: true}) light!: boolean;

  constructor(protected authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.authService.getToken()
  }

  handleLogout(){
    this.authService.signOut()
  }

}
