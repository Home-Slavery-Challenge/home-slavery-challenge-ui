import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiChallenge} from '../config';
import {BehaviorSubject, Observable, switchMap, tap} from 'rxjs';
import {Challenge, ChallengeCreate, ChallengeLite} from '../types/challenge';

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private challengesLightSubject = new BehaviorSubject<ChallengeLite[]>([]);
  challengesLightFind$ = this.challengesLightSubject.asObservable();

  private challengeSubject = new BehaviorSubject<Challenge|null>(null);
  challengeFind$ = this.challengeSubject.asObservable();



  constructor(private http: HttpClient) {
  }

  createChallenge(challenge: ChallengeCreate) {
    return this.http.post<any>(`${apiChallenge}/`, {...challenge}, {observe: 'response'});
  }

  deleteChallenge(idChallenge: number): Observable<ChallengeLite[]> {
    return this.http.delete<void>(`${apiChallenge}/${idChallenge}`).pipe(
      switchMap(() => this.getLightChallenges())
    );
  }

  getChallenge(id:number) {
    return this.http.get<Challenge>(`${apiChallenge}/${id}`).pipe(
      tap(c => this.challengeSubject.next(c))
    )
  }

  getLightChallenges() {
    return this.http.get<ChallengeLite[]>(`${apiChallenge}/light`).pipe(
      tap((c => this.challengesLightSubject.next(c)))
    )
  }
}
