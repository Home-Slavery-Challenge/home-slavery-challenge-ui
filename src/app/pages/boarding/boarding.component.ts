import {Component, OnInit} from '@angular/core';
import {ClrDatagridModule, ClrIconModule, ClrModalModule} from '@clr/angular';
import {CreateComponent} from './create/create.component';
import {ChallengeLite, ChallengeService} from '../../services/challenge.service';
import {Observable} from 'rxjs';
import {AsyncPipe, NgIf, TitleCasePipe} from '@angular/common';
import DeleteComponent from '../../modals/challenges/delete/delete.component';
import {AuthenticationService} from '../../services/authentication.service';
import {UserClass} from '../../types/user';

@Component({
  selector: 'app-boarding',
  imports: [
    ClrIconModule,
    ClrModalModule,
    CreateComponent,
    NgIf,
    AsyncPipe,
    ClrDatagridModule,
    TitleCasePipe,
    DeleteComponent
  ],
  templateUrl: './boarding.component.html',
  styleUrl: './boarding.component.css'
})
export class BoardingComponent implements OnInit {

  challenges$!: Observable<ChallengeLite[]>;
  opened = false
  userConnected!: string | undefined;

  constructor(private challengeService: ChallengeService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.challenges$ = this.challengeService.challengesFind$;
    this.challengeService.getLightChallenges().subscribe();
    this.userConnected = this.authService.getRegisteredUsername();
  }

  handleOpenModal(){
    this.opened = true;
  }

  onCreateClosed() {
    this.challengeService.getLightChallenges().subscribe();
  }

  manage(id: number){

  }

}
