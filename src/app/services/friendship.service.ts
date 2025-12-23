import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {apiFriendship, apiLogin} from '../config';

@Injectable({
  providedIn: 'root'
})
export class FriendshipService {

  constructor(private http: HttpClient) {}

  getFriendships() {
    return this.http.get<any>(`${apiFriendship}/friends`);
  }

  searchByName(str:string) {
    return this.http.get<any>(`${apiFriendship}/search-by-name/${str}`);
  }

}
