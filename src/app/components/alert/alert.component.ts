import { Component, Input } from '@angular/core';
import { ClrAlertModule } from '@clr/angular';

export type AlertType = 'success' | 'warning' | 'danger' | 'info';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [ClrAlertModule],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent {
  @Input() alert = true;
  @Input() type: AlertType = 'info';
  @Input() message = '';
}
