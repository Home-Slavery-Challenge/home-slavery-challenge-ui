import {Component, OnInit} from '@angular/core';
import {ClrCommonFormsModule, ClrDatagridModule, ClrIconModule, ClrInputModule, ClrModalModule} from "@clr/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FriendshipService} from '../../../services/friendship.service';
import {Observable} from 'rxjs';
import {AlertComponent} from '../../../components/alert/alert.component';
import {AsyncPipe, TitleCasePipe} from '@angular/common';
import {UserLite} from '../../../types/user';
import {AlertType} from '../../../types/alert'

@Component({
  selector: 'app-blocked-friends',
  imports: [
    ClrCommonFormsModule,
    ClrDatagridModule,
    ClrIconModule,
    ClrInputModule,
    ClrModalModule,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    AsyncPipe,
    TitleCasePipe
  ],
  templateUrl: './blocked-friends.component.html',
  styleUrl: './blocked-friends.component.css'
})
export class BlockedFriendsComponent implements OnInit {
  findModal = false;
  users$!: Observable<UserLite[]>;
  messageAlert = {alert: true, type: 'info' as AlertType, message: ''};

  constructor(private friendshipService: FriendshipService) {
  }

  ngOnInit() {
    this.users$ = this.friendshipService.usersBlocked$;
    this.friendshipService.getBlockedFriendship().subscribe();
  }

  openModal() {
    this.findModal = true
    this.friendshipService.getBlockedFriendship().subscribe();
    this.users$ = this.friendshipService.usersBlocked$;
  }

  unblock(userIdReceiver: number) {
    this.friendshipService.unblockFriendship(userIdReceiver).subscribe({
      next: data => {
        this.friendshipService.getBlockedFriendship().subscribe();
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
