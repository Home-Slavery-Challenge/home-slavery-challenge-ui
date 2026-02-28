import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  ClrCheckboxModule,
  ClrCommonFormsModule,
  ClrIconModule,
  ClrInputModule,
  ClrModalModule,
  ClrRadioModule
} from '@clr/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Challenge} from '../../../../../types/challenge';
import {AlertType} from '../../../../../types/alert';
import {ChallengeService} from '../../../../../services/challenge.service';
import {RewardMode, RewardPool} from '../../../../../types/reward';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-modify-mode',
  imports: [
    ClrCommonFormsModule,
    ClrIconModule,
    ClrInputModule,
    ClrModalModule,
    ReactiveFormsModule,
    ClrCheckboxModule,
    FormsModule,
    TitleCasePipe,
    NgIf,
    ClrRadioModule,
    NgForOf
  ],
  templateUrl: './modify-mode.component.html',
  styleUrl: './modify-mode.component.css'
})
export class ModifyModeComponent implements OnInit {
  @Input() challenge!: Omit<Challenge, "periods">;
  @Output() alert = new EventEmitter<{ type: AlertType, message: string }>();
  modalOpen = false;

  isRandom!: boolean;
  rewards!: RewardPool[];
  rewardSelectedId?: number;

  constructor(private challengeService: ChallengeService) {
  }

  ngOnInit(): void {
    this.isRandom = this.challenge.rewardMode === RewardMode.RANDOM;
    this.rewards = this.challenge.rewardPool ?? [];

    if (this.challenge.rewardMode === RewardMode.RECURRING) {
      this.rewardSelectedId = this.challenge.recurringReward?.id;
    }
  }

  handleClose() {
    this.modalOpen = false;
  }

  handleModify() {
    const selectedReward =
      this.rewardSelectedId
        ? this.rewards.find(r => r.id === this.rewardSelectedId)
        : undefined;

    const updatedChallenge: Omit<Challenge, "periods"> = {
      ...this.challenge,
      rewardMode: this.isRandom ? RewardMode.RANDOM : RewardMode.RECURRING,
      recurringReward: this.isRandom ? undefined : selectedReward,
    };

    this.challengeService.updateChallenge(updatedChallenge).subscribe({
      next: (res) => this.alert.emit({ type: "success", message: `${res.message} modified successfully` }),
      error: (err) =>
        this.alert.emit({
          type: "danger",
          message: err?.error?.message ?? "Error during modify challenge",
        }),
    });

    this.modalOpen = false;
  }

  protected readonly RewardMode = RewardMode;
}
