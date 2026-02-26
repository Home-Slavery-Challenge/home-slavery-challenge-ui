import {ClrDatagridModule, ClrIconModule, ClrModalModule} from '@clr/angular';
import {AsyncPipe, NgIf, TitleCasePipe} from '@angular/common';
import {CreateComponent} from '../create/create.component';
import {ChallengeLite} from '../../../types/challenge';
import {Observable} from 'rxjs';
import {ChallengeService} from '../../../services/challenge.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import DeleteComponent from '../../../modals/challenges/delete/delete.component';

@Component({
  selector: 'app-board',
  imports: [
    ClrIconModule,
    ClrModalModule,
    TitleCasePipe,
    ClrDatagridModule,
    CreateComponent,
    NgIf,
    AsyncPipe,
    DeleteComponent,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {

  challenges$!: Observable<ChallengeLite[]>;
  opened = false
  userConnected!: string | undefined;

  constructor(private challengeService: ChallengeService, private authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
    this.challenges$ = this.challengeService.challengesLightFind$;
    this.challengeService.getChallenges().subscribe();
    this.userConnected = this.authService.getRegisteredUsername();
  }

  handleOpenModal() {
    this.opened = true;
  }

  onCreateClosed() {
    this.challengeService.getChallenges().subscribe();
  }

  manage(id: number) {
    this.router.navigate(['/boarding/manage'], { queryParams: { id } });
  }

}

