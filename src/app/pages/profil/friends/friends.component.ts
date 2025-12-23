import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FriendshipService} from '../../../services/friendship.service';
import {ClrButtonGroupModule, ClrModalModule} from '@clr/angular';
import {FindFriendsComponent} from '../../../modals/find-friends/find-friends.component';

@Component({
  selector: 'app-friends',
  imports: [
    ClrButtonGroupModule,
    ClrModalModule,
    FindFriendsComponent
  ],
  templateUrl: './friends.component.html',
  styleUrl: './friends.component.css'
})
export class FriendsComponent implements OnInit {

  friends:any[]=[]


  constructor(private friendshipService: FriendshipService) {
  }

  ngOnInit(): void {
        this.friendshipService.getFriendships().subscribe({
          next: data => {
            this.friends = data
          }
        })
    }


}
