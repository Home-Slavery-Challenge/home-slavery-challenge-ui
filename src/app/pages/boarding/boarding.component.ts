import {Component, OnInit} from '@angular/core';
import {ClrIconModule, ClrModalModule} from '@clr/angular';
import {CreateComponent} from './create/create.component';
import {ChallengeLite, ChallengeService} from '../../services/challenge.service';
import {Observable} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {FriendshipService} from '../../services/friendship.service';

@Component({
  selector: 'app-boarding',
  imports: [
    ClrIconModule,
    ClrModalModule,
    CreateComponent,
    NgIf,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './boarding.component.html',
  styleUrl: './boarding.component.css'
})
export class BoardingComponent implements OnInit {

  challenges$!: Observable<ChallengeLite[]>;
  opened = false

  constructor(private challengeService: ChallengeService, private friendshipService: FriendshipService) {
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
}
