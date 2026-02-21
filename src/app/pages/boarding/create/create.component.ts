import {Component, EventEmitter, input, Input, OnInit, Output} from '@angular/core';
import {ClrComboboxModule, ClrInputModule, ClrModalModule} from "@clr/angular";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {FriendshipService, UserLite} from '../../../services/friendship.service';
import {Observable} from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';
import {ChallengeCreate, ChallengeService} from '../../../services/challenge.service';
import {AlertComponent, AlertType} from '../../../components/alert/alert.component';

@Component({
  selector: 'app-create',
  imports: [
    ClrModalModule,
    ClrInputModule,
    FormsModule,
    ReactiveFormsModule,
    ClrComboboxModule,
    AsyncPipe,
    NgIf,
    AlertComponent
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent implements OnInit {
  @Input() opened = false;

  @Output() openedChange = new EventEmitter<boolean>();
  @Output() closed = new EventEmitter<void>();

  user: string | undefined;
  newGroupeChallenge!: FormGroup;
  friends$!: Observable<UserLite[]>;
  rewards: string[] = ['Free hugs', 'Restaurant', 'Gift']
  rewardsSelected = this.rewards

  tasks: string[] = ['Vacuum cleaner ', 'Dust', 'Mop']
  tasksSelected = this.tasks

  messageAlert = {alert: true, type: 'info' as AlertType, message: ''};

  setAlert(alert: boolean, type: AlertType, message: string) {
    this.messageAlert.alert = alert;
    this.messageAlert.type = type;
    this.messageAlert.message = message;
  }

  constructor(protected authService: AuthenticationService, private friendshipService: FriendshipService, private challengeService: ChallengeService) {
  }

  ngOnInit(): void {
    this.user = this.authService.loggedUser!;

    this.friends$ = this.friendshipService.friends$;
    this.friendshipService.loadUserFriendships().subscribe();

    this.newGroupeChallenge = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      owner: new FormControl(this.user),
      participants: new FormControl<UserLite[]>([]),
      rewards: new FormControl(this.rewardsSelected, [Validators.required, Validators.minLength(1)]),
      reward: new FormControl<string>(''),
      tasks: new FormControl(this.tasksSelected, [Validators.required, Validators.minLength(1)]),
      task: new FormControl<string>(''),
    });
  }

  get nameCtrl() {
    return this.newGroupeChallenge.get('name')!;
  }

  get rewardsCtrl() {
    return this.newGroupeChallenge.get('rewards')!;
  }

  get tasksCtrl() {
    return this.newGroupeChallenge.get('tasks')!;
  }

  handleCancel() {
    this.setOpen(false);
  }

  handleSend() {
    const {
      owner,
      name,
      participants = [],
      rewards = [],
      tasks = []
    }: ChallengeCreate = this.newGroupeChallenge.value;

    const payload: ChallengeCreate = {
      owner,
      name: name?.trim(),
      participants: participants.map((p: any) => p.id),
      rewards: rewards.map((r: string) => r.trim()),
      tasks: tasks.map((t: string) => t.trim()),
    };

    this.challengeService.createChallenge(payload).subscribe({
      next: (res) => {
        this.setOpen(false);
        this.setAlert(true, "info", "");
        this.closed.emit();
        this.newGroupeChallenge.reset();
      },
      error: (err) => {
        this.setAlert(false, "danger", `Error ${err.status}: ${err.error.error}.`);
      }
    });
  }

  addReward() {
    const ctrl = this.newGroupeChallenge.get('reward') as FormControl<string>;
    const value = (ctrl.value ?? '').trim();

    if (!value) return;
    if (!this.rewards.includes(value)) this.rewards = [...this.rewards, value];

    const selectedCtrl = this.newGroupeChallenge.get('rewards') as FormControl<string[]>;
    const selected = selectedCtrl.value ?? [];
    if (!selected.includes(value)) {
      selectedCtrl.setValue([...selected, value]);
    }

    ctrl.setValue('');
    ctrl.markAsPristine();
    ctrl.markAsUntouched();
  }


  addTask() {
    const ctrl = this.newGroupeChallenge.get('task') as FormControl<string>;
    const value = (ctrl.value ?? '').trim();

    if (!value) return;
    if (!this.tasks.includes(value)) this.tasks = [...this.tasks, value];

    const selectedCtrl = this.newGroupeChallenge.get('tasks') as FormControl<string[]>;
    const selected = selectedCtrl.value ?? [];
    if (!selected.includes(value)) {
      selectedCtrl.setValue([...selected, value]);
    }

    ctrl.setValue('');
    ctrl.markAsPristine();
    ctrl.markAsUntouched();
  }

  private setOpen(isOpen: boolean) {
    const wasOpen = this.opened;
    this.opened = isOpen;
    this.openedChange.emit(isOpen);

    if (wasOpen && !isOpen) {
      this.closed.emit();
    }
  }

  protected readonly input = input;
  protected readonly alert = alert;
}
