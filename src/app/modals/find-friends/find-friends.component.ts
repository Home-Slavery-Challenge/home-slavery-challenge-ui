import {Component} from '@angular/core';
import {ClrDatagridModule, ClrInputModule, ClrModalModule} from "@clr/angular";
import {FormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {FriendshipService} from '../../services/friendship.service';

// TODO : Quand je cherche un user, je ne devrais pas apparaitre dans la liste de recherche, checker back

@Component({
  selector: 'app-find-friends',
  imports: [
    ClrModalModule,
    ClrDatagridModule,
    ClrInputModule,
    FormsModule
  ],
  templateUrl: './find-friends.component.html',
  styleUrl: './find-friends.component.css'
})
export class FindFriendsComponent {
  findModal = false;
  inputSearch = ""
  users: { username: string }[] = []

  constructor(private http: HttpClient, private friendshipService: FriendshipService) {
  }


  updateSearchField() {
    this.friendshipService.searchByName(this.inputSearch).subscribe(
      data => {
        this.users = data;
      }
    )

  }


  add(user: any) {

  }

  test() {
    console.log('test')
  }

  block(user: any) {

  }

  protected readonly console = console;
}
