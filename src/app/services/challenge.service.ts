import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiChallenge} from '../config';
import {BehaviorSubject, Observable, switchMap, tap} from 'rxjs';

export interface ChallengeCreate {
  name: string,
  owner: string,
  participants: number[],
  rewards: string[],
  tasks: string[],
}

export interface ChallengeLite {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private challengesSubject = new BehaviorSubject<ChallengeLite[]>([]);
  challengesFind$ = this.challengesSubject.asObservable();

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

  getLightChallenges() {
    return this.http.get<ChallengeLite[]>(`${apiChallenge}/`).pipe(
      tap((c => this.challengesSubject.next(c)))
    )
  }
}
