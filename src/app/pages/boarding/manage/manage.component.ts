import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClrButtonGroupModule, ClrDatagridModule, ClrIconModule} from '@clr/angular';
import {ChallengeService} from '../../../services/challenge.service';
import {Observable, switchMap} from 'rxjs';
import {AsyncPipe, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {AuthenticationService} from '../../../services/authentication.service';
import {ModifyChallengeNameComponent} from './dialogs/name/modify-challenge-name.component';
import {Challenge} from '../../../types/challenge';
import {AlertComponent} from '../../../components/alert/alert.component';
import {AlertType} from '../../../types/alert';
import {ModifyParticipantsComponent} from './dialogs/participants/modify-participants.component';
import {ModifyTasksComponent} from './dialogs/tasks/modify-tasks.component';
import {ModifyRewardsComponent} from './dialogs/rewards/modify-rewards.component';
import {RewardMode} from '../../../types/reward';
import {ModifyModeComponent} from './dialogs/mode/modify-mode.component';

@Component({
  selector: 'app-manage',
  imports: [
    ClrIconModule,
    AsyncPipe,
    ClrDatagridModule,
    NgIf,
    NgForOf,
    TitleCasePipe,
    ClrButtonGroupModule,
    ModifyChallengeNameComponent,
    AlertComponent,
    ModifyParticipantsComponent,
    ModifyTasksComponent,
    ModifyRewardsComponent,
    ModifyModeComponent
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  challenge$!: Observable<Omit<Challenge, "periods"> | null>;
  messageAlert = {alert: true, type: 'info' as AlertType, message: ''};


  constructor(private router: Router, private challengeService: ChallengeService, private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.challenge$ = this.challengeService.challengeFind$;

    this.route.queryParamMap
      .pipe(
        switchMap(params => this.challengeService.getChallenge(Number(params.get('id'))))
      )
      .subscribe({
        next: c => c.owner.username !== this.authService.loggedUser && this.backHomeBoard()
      });
  }

  setAlert(type?: AlertType, message?: string): void {
    this.messageAlert.alert = false;
    this.messageAlert.message = message!;
    this.messageAlert.type = type!;
  }

  backHomeBoard() {
    this.router.navigate(['/boarding']);
  }

  protected readonly RewardMode = RewardMode;
}
