import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClrCommonFormsModule, ClrInputModule, ClrModalModule} from '@clr/angular';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Challenge} from '../../../../../types/challenge';
import {ChallengeService} from '../../../../../services/challenge.service';
import {AlertType} from '../../../../../types/alert';

@Component({
  selector: 'app-modify-challenge-name',
  imports: [
    ClrModalModule,
    ClrCommonFormsModule,
    ClrInputModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modify-challenge-name.component.html',
  styleUrl: './modify-challenge-name.component.css'
})
export class ModifyChallengeNameComponent implements OnInit {
  @Input() challenge!: Omit<Challenge, "periods">;
  @Output() alert = new EventEmitter<{ type: AlertType, message: string }>();
  modalOpen = false;

  constructor(private challengeService: ChallengeService) {
  }

  nameChallengeForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  });

  ngOnInit(): void {
    this.nameChallengeForm.patchValue({name: this.challenge?.name ?? ''});
  }

  handleClose() {
    this.nameChallengeForm.reset({name: this.challenge?.name ?? ''});
    this.modalOpen = false;
  }

  handleModify() {
    const newName = this.nameChallengeForm.value['name'];

    if (this.challenge?.name !== newName) {

      const updatedChallenge = {
        ...this.challenge,
        name: newName!
      };

      this.challengeService.updateChallenge(updatedChallenge).subscribe({
        next: (res) => {
          this.alert.emit({type: "success", message: `${res.message} modified successfully`,});
        },
        error: (err) => {
          this.alert.emit({type: "danger", message: err?.error?.message ?? "Error during modify challenge",});
        },
      });
    }
    this.modalOpen = false;
  }
}
