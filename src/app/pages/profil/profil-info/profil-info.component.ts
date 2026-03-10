import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClrInputModule} from '@clr/angular';
import {FormsModule} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {UserDetailClass} from '../../../types/user';
import {Observable} from 'rxjs';
import {AsyncPipe, DatePipe, TitleCasePipe} from '@angular/common';
import {ModifyPasswordComponent} from './dialogs/modify-password/modify-password.component';
import {AlertComponent} from '../../../components/alert/alert.component';
import {AlertType} from '../../../types/alert';

@Component({
  selector: 'app-profil-info',
  imports: [
    ClrInputModule,
    FormsModule,
    AsyncPipe,
    DatePipe,
    ModifyPasswordComponent,
    AlertComponent,
    TitleCasePipe
  ],
  templateUrl: './profil-info.component.html',
  styleUrl: './profil-info.component.css'
})
export class ProfilInfoComponent implements OnInit {
  input = '';
  user$!: Observable<UserDetailClass>;
  messageAlert = {alert: true, type: 'info' as AlertType, message: ''};
  @Output() alert = new EventEmitter<{ type: AlertType, message: string }>();

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.user$ = this.authService.getUserinfo();
  }

  setAlert(type?: AlertType, message?: string): void {
    this.messageAlert.alert = false;
    this.messageAlert.message = message!;
    this.messageAlert.type = type!;
  }
}
