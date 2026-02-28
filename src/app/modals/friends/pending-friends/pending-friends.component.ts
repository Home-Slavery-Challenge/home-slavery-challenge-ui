import {Component} from '@angular/core';
import {ClrAlertModule, ClrDatagridModule, ClrModalModule} from "@clr/angular";
import {FriendshipService} from '../../../services/friendship.service';
import {Observable} from 'rxjs';
import {AsyncPipe, TitleCasePipe} from '@angular/common';
import {AlertComponent} from '../../../components/alert/alert.component';
import {Friendship} from '../../../types/friendship';
import {AlertType} from '../../../types/alert';

@Component({
  selector: 'app-pending-friends',
  imports: [
    ClrDatagridModule,
    ClrModalModule,
    AsyncPipe,
    ClrAlertModule,
    AlertComponent,
    TitleCasePipe,
  ],
  templateUrl: './pending-friends.component.html',
  styleUrl: './pending-friends.component.css'
})
export class PendingFriendsComponent {
  findModal = false;
  friendships$!: Observable<Friendship[]>;
  messageAlert = {alert: true, type: 'info' as AlertType, message: ''};

  constructor(private friendshipService: FriendshipService) {
  }

  openModal() {
    this.findModal = true
    this.friendships$ = this.friendshipService.friendship$;
    this.friendshipService.getFriendshipPendingRequest().subscribe();
  }

  declineRequest(userId: number) {
    this.friendshipService.declinePendingSendRequest(userId).subscribe({
      next: data => {
        this.friendshipService.getFriendshipPendingRequest().subscribe();
        this.setAlert(false, "success", "Friendship request cancelled");
      }
    })
  }

  setAlert(alert: boolean, type: AlertType, message: string) {
    this.messageAlert.alert = alert;
    this.messageAlert.type = type;
    this.messageAlert.message = message;
  }

}
