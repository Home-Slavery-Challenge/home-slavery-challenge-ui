import {Component, Input} from '@angular/core';
import {ClrAlertModule} from '@clr/angular';
import {AlertType} from '../../types/alert';

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
  @Input() link?: string;
  @Input() action?: () => void;

  onLinkClick(event: Event) {
    if (this.action) {
      this.action();
    }

    if (!this.link) {
      event.preventDefault();
      return;
    }

  }
}
