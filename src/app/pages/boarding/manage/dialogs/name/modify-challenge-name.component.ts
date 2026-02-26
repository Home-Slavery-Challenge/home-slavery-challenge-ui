import {Component, Input, OnInit} from '@angular/core';
import {ClrCommonFormsModule, ClrInputModule, ClrModalModule} from '@clr/angular';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {Challenge} from '../../../../../types/challenge';
import {ChallengeService} from '../../../../../services/challenge.service';

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
      this.challenge.name = newName!;
      this.challengeService.updateChallenge(this.challenge).subscribe({
        error:(e)=>
      })
    }

    this.modalOpen = false;
  }
}
