import {Component, OnInit} from '@angular/core';
import {ClrDatagridModule, ClrIconModule, ClrModalModule} from '@clr/angular';
import {CreateComponent} from './create/create.component';
import {ChallengeLite, ChallengeService} from '../../services/challenge.service';
import {Observable} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {FriendshipService} from '../../services/friendship.service';
import DeleteComponent from '../../modals/challenges/delete/delete.component';

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

  constructor(private challengeService: ChallengeService) {
  }

  ngOnInit(): void {
    this.challenges$ = this.challengeService.challengesFind$;
    this.challengeService.getLightChallenges().subscribe();
  }

  handleOpenModal() {
    this.opened = true;
  }

  onCreateClosed() {
    this.challengeService.getLightChallenges().subscribe();
  }

  manage(id:number){

  }

}
