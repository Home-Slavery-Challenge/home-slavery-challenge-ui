import {Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ClrButtonGroupModule,
  ClrComboboxModule,
  ClrCommonFormsModule,
  ClrIconModule,
  ClrInputModule,
  ClrModalModule
} from '@clr/angular';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Challenge} from '../../../../../types/challenge';
import {AlertType} from '../../../../../types/alert';
import {ChallengeService} from '../../../../../services/challenge.service';
import {AlertComponent} from '../../../../../components/alert/alert.component';
import {User, UserLite} from '../../../../../types/user';
import {Observable} from 'rxjs';
import {FriendshipService} from '../../../../../services/friendship.service';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-modify-participants',
  imports: [
    ClrCommonFormsModule,
    ClrIconModule,
    ClrInputModule,
    ClrModalModule,
    ReactiveFormsModule,
    AlertComponent,
    ClrComboboxModule,
    FormsModule,
    ClrButtonGroupModule,
    AsyncPipe
  ],
  templateUrl: './modify-participants.component.html',
  styleUrl: './modify-participants.component.css'
})
export class ModifyParticipantsComponent {
  @Input() challenge!: Omit<Challenge, "periods">;
  @Output() alert = new EventEmitter<{ type: AlertType, message: string }>();
  modalOpen = false;

  friends$!: Observable<UserLite[]>;

  constructor(private challengeService: ChallengeService, private friendshipService: FriendshipService) {
  }

  ngOnInit() {
    const initial = this.challenge.participants.filter(u => u.username !== this.challenge.owner.username);
    this.challengeForm.patchValue({ participants: initial });

    this.friends$ = this.friendshipService.friends$;
    this.friendshipService.loadUserFriendships().subscribe();
  }

  challengeForm = new FormGroup({
    participants: new FormControl<UserLite[]>([]),
  });


  handleClose() {
    this.challengeForm.reset({participants: this.challenge.participants});
    this.modalOpen = false;
  }

  // Bidouille sur le typage du au format renvoyé par l'api, le fixer en mettant un type de user generaliste pour tous les cas ...
  handleModify() {
    const newParts: User[] = this.challengeForm.value['participants'] as User[] ?? [];
    const updatedChallenge: Omit<Challenge, "periods"> = {
      ...this.challenge,
      participants: [this.challenge.owner, ...newParts],
    };

    this.challengeService.updateChallenge(updatedChallenge).subscribe({
      next: (res) => this.alert.emit({ type: "success", message: `${res.message} modified successfully` }),
      error: (err) => this.alert.emit({ type: "danger", message: err?.error?.message ?? "Error during modify challenge" }),
    });

    this.modalOpen = false;
  }
}
