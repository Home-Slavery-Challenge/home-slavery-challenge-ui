import {Component, OnInit} from '@angular/core';
import {ClrAlertModule, ClrDatagridModule, ClrInputModule, ClrModalModule} from "@clr/angular";
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {FriendshipService, UserLite} from '../../services/friendship.service';
import { CommonModule } from '@angular/common';
import {Observable} from 'rxjs';
import {AlertComponent, AlertType} from '../../components/alert/alert.component';

// TODO : Quand je cherche un user, je ne devrais pas apparaitre dans la liste de recherche, checker back




// TODO : Backend recueprer tous les friendship username + statut
// - modifier en base ou ajoute rune friend ship a vec un statut different, , merge l'object dan el backend,afficher la liste avec des icons correcpondant, blocké ou non, demande amis en attente ou non, ou alors juste amis



@Component({
  selector: 'app-find-friends',
  imports: [
    ClrModalModule,
    ClrDatagridModule,
    ClrInputModule,
    FormsModule,
    CommonModule,
    ClrAlertModule,
    AlertComponent
  ],
  templateUrl: './find-friends.component.html',
  styleUrl: './find-friends.component.css'
})
export class FindFriendsComponent implements OnInit {
  findModal = false;
  inputSearch = "";
  users$!: Observable<UserLite[]>;

  messageAlert = { alert: true, type: 'info' as AlertType, message: '' };

  constructor(private friendshipService: FriendshipService) {}

  ngOnInit() {
    this.users$ = this.friendshipService.usersFind$;
    this.friendshipService.loadUserFriendships().subscribe();
  }

  updateSearchField() {
    this.users$ = this.friendshipService.searchByName(this.inputSearch)
  }


  add(userId: any) {
    this.friendshipService.sendFriendshipRequest(userId).subscribe({
      next: () => {
        this.users$ = this.friendshipService.searchByName(this.inputSearch)
        this.setAlert(false,"success", "Friendship Added")
      }
    });
  }

  block(userId: any) {
    this.friendshipService.sendFriendshipBlockRequest(userId).subscribe({
      next: () => {
        this.users$ = this.friendshipService.searchByName(this.inputSearch)
        this.setAlert(false,"warning", "Friendship Blocked")
      }
    });
  }


  setAlert(alert: boolean, type: AlertType, message: string) {
    this.messageAlert.alert = alert;
    this.messageAlert.type = type;
    this.messageAlert.message = message;
  }


}
