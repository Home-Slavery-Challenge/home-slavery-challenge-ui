import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClrDatagridModule, ClrIconModule} from '@clr/angular';
import {ChallengeService} from '../../../services/challenge.service';
import {Observable, switchMap} from 'rxjs';
import {ChallengeLite} from '../../../types/challenge';
import {AsyncPipe, NgForOf, NgIf, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-manage',
  imports: [
    ClrIconModule,
    AsyncPipe,
    ClrDatagridModule,
    NgIf,
    NgForOf,
    TitleCasePipe
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  challenge$!: Observable<any>;


  constructor(private router: Router, private challengeService: ChallengeService) {}

  // ngOnInit(): void {
  //   this.challenge$ = this.challengeService.challengeFind$;
  //
  //   const idStr = this.route.snapshot.paramMap.get('id');
  //   if (!idStr) {
  //     // pas d'id -> retour home
  //     this.router.navigate(['/boarding']);
  //     return;
  //   }
  //
  //   const id = Number(idStr);
  //   if (Number.isNaN(id)) {
  //     this.router.navigate(['/boarding']);
  //     return;
  //   }
  //
  //   this.challengeService.getChallenge(id).subscribe();
  // }

  ngOnInit(): void {
    this.challenge$ = this.challengeService.challengeFind$;

    this.route.queryParamMap
      .pipe(
        switchMap(params => this.challengeService.getChallenge(Number(params.get('id'))))
      )
      .subscribe();
  }

  backHomeBoard(){
    this.router.navigate(['/boarding']);
  }
}
