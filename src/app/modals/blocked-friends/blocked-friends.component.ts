import { Component } from '@angular/core';
import {ClrCommonFormsModule, ClrDatagridModule, ClrIconModule, ClrInputModule, ClrModalModule} from "@clr/angular";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FriendshipService} from '../../services/friendship.service';

@Component({
  selector: 'app-blocked-friends',
    imports: [
        ClrCommonFormsModule,
        ClrDatagridModule,
        ClrIconModule,
        ClrInputModule,
        ClrModalModule,
        FormsModule,
        ReactiveFormsModule
    ],
  templateUrl: './blocked-friends.component.html',
  styleUrl: './blocked-friends.component.css'
})
export class BlockedFriendsComponent {
  // findModal = false;
  // users: {id:number, username: string }[] = []
  // constructor(private friendshipService: FriendshipService) {
  // }
  // ngOnInit() {
  //   this.loadBlockedFriendship()
  // }
  //
  // loadBlockedFriendship() {
  //   // this.friendshipService.getBlockedFriendship().subscribe({
  //   //   next: data => {
  //   //     this.users = data;
  //   //   }
  //   // })
  // }
  //
  // unblock(userIdReceiver:number){
  //   this.friendshipService.unblockFriendship(userIdReceiver).subscribe({
  //     next: data => {
  //       this.loadBlockedFriendship()
  //     }
  //   })
  // }

}
