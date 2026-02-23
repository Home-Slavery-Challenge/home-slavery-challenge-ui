import {Component, Input} from '@angular/core';
import {ClrDatagridModule, ClrModalModule} from '@clr/angular';
import {ChallengeLite, ChallengeService} from '../../../services/challenge.service';
import {AlertType} from '../../../components/alert/alert.component';
import {TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-delete',
  imports: [
    ClrDatagridModule,
    ClrModalModule,
    TitleCasePipe,
  ],
  templateUrl: './delete.component.html',
  styleUrl: './delete.component.css'
})
class DeleteComponent {
  findModal = false;
  @Input() challenge!: ChallengeLite;


  constructor(private  challengeService: ChallengeService) {
  }

  deleteChallenge(){
    this.challengeService.deleteChallenge(this.challenge.id).subscribe({
      next: () => (this.findModal = false),
    });
  }


  openModal(event?: MouseEvent) {
    event?.preventDefault();
    event?.stopPropagation();
    this.findModal = true;
  }
}

export default DeleteComponent
