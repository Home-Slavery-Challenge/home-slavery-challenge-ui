import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClrButtonGroupModule, ClrDatagridModule, ClrIconModule} from '@clr/angular';
import {ChallengeService} from '../../../services/challenge.service';
import {Observable, switchMap} from 'rxjs';
import {ChallengeLite} from '../../../types/challenge';
import {AsyncPipe, NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-manage',
  imports: [
    ClrIconModule,
    AsyncPipe,
    ClrDatagridModule,
    NgIf,
    NgForOf,
    TitleCasePipe,
    ClrButtonGroupModule
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  challenge$!: Observable<any>;


  constructor(private router: Router, private challengeService: ChallengeService, private authService:AuthenticationService) {}

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

  backHomeBoard(){
    this.router.navigate(['/boarding']);
  }
}
