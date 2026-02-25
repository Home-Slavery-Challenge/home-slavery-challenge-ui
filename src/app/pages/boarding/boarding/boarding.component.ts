import {ClrDatagridModule, ClrIconModule, ClrModalModule} from '@clr/angular';
import {AsyncPipe, NgIf, TitleCasePipe} from '@angular/common';
import DeleteComponent from '../../../modals/challenges/delete/delete.component';
import {CreateComponent} from '../create/create.component';
import {ChallengeLite} from '../../../types/challenge';
import {Observable} from 'rxjs';
import {ChallengeService} from '../../../services/challenge.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-boarding',
  imports: [
    ClrIconModule,
    ClrModalModule,
    TitleCasePipe,
    ClrDatagridModule,
    DeleteComponent,
    CreateComponent,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './boarding.component.html',
  styleUrl: './boarding.component.css'
})
export class BoardingComponent implements OnInit {

  challenges$!: Observable<ChallengeLite[]>;
  opened = false
  userConnected!: string | undefined;

  constructor(private challengeService: ChallengeService, private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.challenges$ = this.challengeService.challengesFind$;
    this.challengeService.getLightChallenges().subscribe();
    this.userConnected = this.authService.getRegisteredUsername();
  }

  handleOpenModal() {
    this.opened = true;
  }

  onCreateClosed() {
    this.challengeService.getLightChallenges().subscribe();
  }

  manage(id: number) {
    this.router.navigate(['/boarding/manage'], {queryParams: {id}})
  }

}

