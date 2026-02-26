import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiChallenge} from '../config';
import {BehaviorSubject, Observable, switchMap, tap} from 'rxjs';
import {Challenge, ChallengeCreate, ChallengeLite} from '../types/challenge';
import {ApiResponse} from '../types/common';


@Injectable({
  providedIn: 'root'
})
export class ChallengeService {
  private challengesLightSubject = new BehaviorSubject<ChallengeLite[]>([]);
  challengesLightFind$ = this.challengesLightSubject.asObservable();

  private challengeSubject = new BehaviorSubject<Omit<Challenge, "periods"> | null>(null);
  challengeFind$ = this.challengeSubject.asObservable();


  constructor(private http: HttpClient) {
  }

  createChallenge(challenge: ChallengeCreate) {
    return this.http.post<any>(`${apiChallenge}/`, {...challenge}, {observe: 'response'});
  }

  deleteChallenge(idChallenge: number): Observable<ChallengeLite[]> {
    return this.http.delete<void>(`${apiChallenge}/${idChallenge}`).pipe(
      switchMap(() => this.getChallenges())
    );
  }

  getChallenge(id: number) {
    return this.http.get<Omit<Challenge, "periods">>(`${apiChallenge}/${id}`).pipe(
      tap(c => this.challengeSubject.next(c))
    )
  }

  getChallenges() {
    return this.http.get<Omit<Challenge, "periods">[]>(`${apiChallenge}/`).pipe(
      tap((c => this.challengesLightSubject.next(c)))
    )
  }

  updateChallenge(challenge: Omit<Challenge, "periods">) {
    return this.http
      .patch<ApiResponse<Omit<Challenge, "periods">>>(`${apiChallenge}/`, challenge)
      .pipe(
        tap((res) => this.challengeSubject.next(res.data))
      );
  }
}
