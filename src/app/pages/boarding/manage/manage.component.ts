import {Component, inject} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ClrIconModule} from '@clr/angular';

@Component({
  selector: 'app-manage',
  imports: [
    ClrIconModule
  ],
  templateUrl: './manage.component.html',
  styleUrl: './manage.component.css'
})
export class ManageComponent {
  readonly challengeId: string | null;
  private route = inject(ActivatedRoute);

  constructor(private router: Router) {
    this.challengeId = this.route.snapshot.paramMap.get('id');
    const snapshot = this.route.snapshot;
    console.log({
      url: snapshot.url, // https://www.angular.dev
      params: snapshot.params,
      queryParams: snapshot.queryParams, // Query parameters
    });
  }

  backHomeBoard(){
    this.router.navigate(['/boarding']);
  }
}
