import {Component, OnInit} from '@angular/core';
import {ClrAlertModule, ClrDatagridModule, ClrModalModule} from "@clr/angular";
import {FriendshipLite, FriendshipService, UserLite} from '../../services/friendship.service';
import {Observable} from 'rxjs';
import {AsyncPipe} from '@angular/common';
import {AlertComponent, AlertType} from '../../components/alert/alert.component';

@Component({
  selector: 'app-pending-friends',
  imports: [
    ClrDatagridModule,
    ClrModalModule,
    AsyncPipe,
    ClrAlertModule,
    AlertComponent,
  ],
  templateUrl: './pending-friends.component.html',
  styleUrl: './pending-friends.component.css'
})
export class PendingFriendsComponent  {
  findModal = false;
  friendships$!: Observable<FriendshipLite[]>;
  messageAlert = { alert: true, type: 'info' as AlertType, message: '' };

  constructor(private friendshipService: FriendshipService) {}

  openModal(){
    this.findModal = true
    this.friendships$ = this.friendshipService.friendship$;
    this.friendshipService.getFriendshipPendingRequest().subscribe();
  }

  declineRequest(userId: number) {
    this.friendshipService.declineRequest(userId).subscribe({
      next: data => {
        this.friendshipService.getFriendshipPendingRequest().subscribe();
        this.setAlert(false,"success", "Friendship request cancelled");
      }
    })
  }


  setAlert(alert: boolean, type: AlertType, message: string) {
    this.messageAlert.alert = alert;
    this.messageAlert.type = type;
    this.messageAlert.message = message;
  }


}
