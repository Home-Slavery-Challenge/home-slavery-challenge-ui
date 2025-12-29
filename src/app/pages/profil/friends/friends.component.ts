import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FriendshipService} from '../../../services/friendship.service';
import {ClrButtonGroupModule, ClrModalModule} from '@clr/angular';
import {FindFriendsComponent} from '../../../modals/find-friends/find-friends.component';
import {PendingFriendsComponent} from '../../../modals/pending-friends/pending-friends.component';
import {BlockedFriendsComponent} from '../../../modals/blocked-friends/blocked-friends.component';

@Component({
  selector: 'app-friends',
  imports: [
    ClrButtonGroupModule,
    ClrModalModule,
    FindFriendsComponent,
    PendingFriendsComponent,
    BlockedFriendsComponent
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent implements OnInit {

  friends:any[]=[]


  constructor(private friendshipService: FriendshipService) {
  }

  ngOnInit(): void {
        // this.friendshipService.getFriendships();
    }


}
