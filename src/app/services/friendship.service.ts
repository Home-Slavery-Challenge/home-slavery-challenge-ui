import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiFriendship} from '../config';
import {BehaviorSubject, switchMap, tap} from 'rxjs';

export type UserLite = { id: number; username: string };
export type FriendshipLite =  { id: number, receiver: { id: number, username: string } }


@Injectable({
  providedIn: 'root'
})
export class FriendshipService {
  private usersFindSubject = new BehaviorSubject<UserLite[]>([]);
  private usersBlockedSubject = new BehaviorSubject<UserLite[]>([]);
  private friendshipSubject = new BehaviorSubject<FriendshipLite[]>([]);
  usersFind$ = this.usersFindSubject.asObservable();
  usersBlocked$ = this.usersBlockedSubject.asObservable();
  friendship$ = this.friendshipSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  /** charge tous les amis d'un user */
  loadUserFriendships() {
    return this.http.get<UserLite[]>(`${apiFriendship}/friends`).pipe(
      tap(users => this.usersFindSubject.next(users))
    );
  }

  /** recherche par nom */
  searchByName(str: string) {
    return this.http.get<UserLite[]>(`${apiFriendship}/search-by-name/${str}`).pipe(
      tap(users => this.usersFindSubject.next(users))
    );
  }

  sendFriendshipRequest(id: number) {
    return this.http.post<UserLite[]>(`${apiFriendship}/create/${id}`, {observe: 'response'})
  }


  sendFriendshipBlockRequest(id: number) {
    return this.http.post<any>(`${apiFriendship}/block-user/${id}`, {observe: 'response'});
  }

  getFriendshipPendingRequest() {
    return this.http.get<any>(`${apiFriendship}/pending-sent`).pipe(
      tap(friendship => this.friendshipSubject.next(friendship))
    );
  }

  getBlockedFriendship() {
    return this.http.get<UserLite[]>(`${apiFriendship}/blocked`).pipe(
      tap(users => this.usersBlockedSubject.next(users))
    )
  }


  unblockFriendship(id: number) {
    return this.http.post<any>(`${apiFriendship}/unblock-user/${id}`, {observe: 'response'});
  }


  declineRequest(friendshipId: number) {
    return this.http.post<any>(`${apiFriendship}/decline/${friendshipId}`, {observe: 'response'});

  }

}
