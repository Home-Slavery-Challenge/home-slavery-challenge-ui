import { AsyncPipe } from '@angular/common';
import {FriendshipService, UserLite} from '../../../services/friendship.service';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ClrButtonGroupModule, ClrDatagridModule, ClrModalModule} from '@clr/angular';
import {FindFriendsComponent} from '../../../modals/find-friends/find-friends.component';
import {PendingFriendsComponent} from '../../../modals/pending-friends/pending-friends.component';
import {BlockedFriendsComponent} from '../../../modals/blocked-friends/blocked-friends.component';
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
  messageAlert = { alert: true, type: 'info' as AlertType, message: '' };

  constructor(private friendshipService: FriendshipService) {}

  ngOnInit(): void {
    this.users$ = this.friendshipService.friends$;
    this.friendshipService.loadUserFriendships().subscribe();
  }

  decline(userId: number) {
    this.friendshipService.declineFriendship(userId).subscribe({
      next: () => {
        this.friendshipService.loadUserFriendships().subscribe();
        this.setAlert(false,"warning", "Friendship Blocked")
      }
    });
  }


  block(userId: any) {
    this.friendshipService.sendFriendshipBlockRequest(userId).subscribe({
      next: () => {
        this.friendshipService.loadUserFriendships().subscribe();
        this.setAlert(false,"warning", "Friendship Declined")
      }
    });
  }

  setAlert(alert: boolean, type: AlertType, message: string) {
    this.messageAlert.alert = alert;
    this.messageAlert.type = type;
    this.messageAlert.message = message;
  }
}
