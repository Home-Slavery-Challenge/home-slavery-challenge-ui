import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AlertComponent} from '../../../../../components/alert/alert.component';
import {ClrCommonFormsModule, ClrIconModule, ClrInputModule, ClrModalModule} from '@clr/angular';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
import {Challenge} from '../../../../../types/challenge';
import {AlertType} from '../../../../../types/alert';
import {ChallengeService} from '../../../../../services/challenge.service';
import {RewardPool} from '../../../../../types/reward';

@Component({
  selector: 'app-modify-rewards',
  imports: [
    AlertComponent,
    ClrCommonFormsModule,
    ClrIconModule,
    ClrInputModule,
    ClrModalModule,
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './modify-rewards.component.html',
  styleUrl: './../tasks/modify-tasks.component.css'
})
export class ModifyRewardsComponent {
  @Input() challenge!: Omit<Challenge, "periods">;
  @Output() alert = new EventEmitter<{ type: AlertType, message: string }>();
  modalOpen = false;

  rewards: RewardPool[] = [];

  constructor(private challengeService: ChallengeService) {
  }

  ngOnInit(): void {
    this.rewards = [...(this.challenge.rewardPool ?? [])];
  }

  rewardForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
    desc: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]),
  });

  handleClose() {
    this.modalOpen = false;
    this.rewardForm.reset();
  }

  addReward() {
    if (this.rewardForm.invalid) {
      this.rewardForm.markAllAsTouched();
      return;
    }

    const newReward: RewardPool = {
      name: this.rewardForm.value['name']!,
      description: this.rewardForm.value['desc']!,
    } as RewardPool;

    this.rewards.push(newReward);

    this.rewardForm.reset({name: '', desc: ''});
  }

  handleDeleteReward(rewardId: number) {
    this.rewards = this.rewards.filter(task => task.id !== rewardId);
  }

  reinitTasks() {
    this.rewards = [...(this.challenge.rewardPool ?? [])];
  }

  handleModify() {
    if (!this.rewards.length) {
      this.alert.emit({type: "danger", message: "You need at least 1 reward"});
      return;
    }

    const updatedChallenge: Omit<Challenge, "periods"> = {
      ...this.challenge,
      rewardPool: this.rewards,
    };

    this.challengeService.updateChallenge(updatedChallenge).subscribe({
      next: (res) => this.alert.emit({type: "success", message: `${res.message} modified successfully`}),
      error: (err) =>
        this.alert.emit({
          type: "danger",
          message: err?.error?.message ?? "Error during modify challenge",
        }),
    });

    this.modalOpen = false;
  }
}

