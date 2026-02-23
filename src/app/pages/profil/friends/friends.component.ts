import { AsyncPipe } from '@angular/common';
import {FriendshipLite, FriendshipService, UserLite} from '../../../services/friendship.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ClrButtonGroupModule, ClrDatagridModule, ClrModalModule} from '@clr/angular';
import {FindFriendsComponent} from '../../../modals/friends/find-friends/find-friends.component';
import {PendingFriendsComponent} from '../../../modals/friends/pending-friends/pending-friends.component';
import {BlockedFriendsComponent} from '../../../modals/friends/blocked-friends/blocked-friends.component';
import {AlertComponent, AlertType} from '../../../components/alert/alert.component';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-friends',
  imports: [
    AsyncPipe,
    ClrButtonGroupModule,
    ClrModalModule,
    FindFriendsComponent,
    PendingFriendsComponent,
    BlockedFriendsComponent,
    ClrDatagridModule,
    AlertComponent,
    TitleCasePipe
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent implements OnInit {
  users$!: Observable<UserLite[]>;
  pendingReceived$!: Observable<FriendshipLite[]>;
  messageAlert = { alert: true, type: 'info' as AlertType, message: '' };

  constructor(private friendshipService: FriendshipService) {}

  ngOnInit(): void {
    this.users$ = this.friendshipService.friends$;
    this.friendshipService.loadUserFriendships().subscribe();

    this.pendingReceived$ = this.friendshipService.received$;
    this.friendshipService.getPendingReceivedRequest().subscribe();
  }

  decline(userId: number) {
    this.friendshipService.declineFriendshipByFriendId(userId).subscribe({
      next: () => {
        this.friendshipService.loadUserFriendships().subscribe();
        this.setAlert(false,"success", "Friendship declined")
      }
    });
  }


  block(userId: any) {
    this.friendshipService.sendFriendshipBlockRequest(userId).subscribe({
      next: () => {
        this.friendshipService.loadUserFriendships().subscribe();
        this.setAlert(false,"warning", "Friendship Blocked")
      }
    });
  }

  setAlert(alert: boolean, type: AlertType, message: string) {
    this.messageAlert.alert = alert;
    this.messageAlert.type = type;
    this.messageAlert.message = message;
  }

  declinePending(friendshipId: number) {
    this.friendshipService.declinePendingSendRequest(friendshipId).subscribe({
      next: () => {
        this.friendshipService.getPendingReceivedRequest().subscribe();
      }
    });
  }
  acceptPending(friendshipId: number) {
    this.friendshipService.acceptFriendship(friendshipId).subscribe({
      next: () => {
        this.friendshipService.getPendingReceivedRequest().subscribe();
        this.friendshipService.loadUserFriendships().subscribe();
      }
    });
  }

  blockPending(userId: number) {
    this.friendshipService.sendFriendshipBlockRequest(userId).subscribe({
      next: () => {
        this.friendshipService.getPendingReceivedRequest().subscribe();
        this.friendshipService.loadUserFriendships().subscribe();
      }
    });
  }
}
