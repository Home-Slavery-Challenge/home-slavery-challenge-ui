import {Component, OnInit} from '@angular/core';
import '@cds/core/icon/register.js';
import { ClarityIcons, userIcon } from '@cds/core/icon';
import {ClrIconModule} from '@clr/angular';
import {AuthenticationService} from '../../services/authentication.service';
import {map, Observable, tap} from 'rxjs';
import {AlertComponent} from '../../components/alert/alert.component';
import {AsyncPipe} from '@angular/common';
import {FriendshipLite} from '../../types/friendship';
import {FriendshipService} from '../../services/friendship.service';
ClarityIcons.addIcons(userIcon);

@Component({
  selector: 'app-home',
  imports: [
    ClrIconModule,
    AlertComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  isConnected: Boolean = false;
  received$!: Observable<FriendshipLite[]>;
  alertPendingReceived$!: Observable<boolean>;

  constructor(private authService: AuthenticationService,private friendshipService: FriendshipService) {
  }

    ngOnInit() {
      this.isConnected = this.authService.isAuthenticated();
      if(this.isConnected){
        this.received$ = this.friendshipService.received$;
        this.friendshipService.getPendingReceivedRequest().subscribe();

        this.alertPendingReceived$ = this.received$.pipe(
          map(receivedArray => receivedArray.some(item => !item.checked))
        );
      }
    }

  togglePendingRequestsVisibility(){
    this.friendshipService.markAsChecked().subscribe();
  }

}
