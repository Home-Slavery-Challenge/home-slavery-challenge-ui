import {Component, EventEmitter, Output} from '@angular/core';
import {ClrCommonFormsModule, ClrInputModule, ClrModalModule} from '@clr/angular';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {AuthenticationService} from '../../../../../services/authentication.service';
import {AlertType} from '../../../../../types/alert';
import {AlertComponent} from '../../../../../components/alert/alert.component';
import {NgIf} from '@angular/common';

function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const newPass = group.get('newPass')?.value;
  const confirm = group.get('confirmNewPass')?.value;
  if (!newPass || !confirm) return null;
  return newPass === confirm ? null : {passwordsMismatch: true};
}

interface AlertInfo {
  alert: boolean;
  type: AlertType;
  message: string;
}


@Component({
  selector: 'app-modify-password',
  standalone: true,
  imports: [ClrCommonFormsModule, ClrInputModule, ClrModalModule, ReactiveFormsModule, AlertComponent, NgIf],
  templateUrl: './modify-password.component.html',
  styleUrl: './modify-password.component.css'
})
export class ModifyPasswordComponent {
  @Output() alert = new EventEmitter<{ type: AlertType; message: string }>();
  modalOpen = false;
  dialogAlert: AlertInfo = { alert: true,type:"info", message: '' };

  passwordForm = new FormGroup(
    {
      oldPass: new FormControl('', [Validators.required]),
      newPass: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
      confirmNewPass: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(25)]),
    },
    {validators: passwordsMatch}
  );

  constructor(private authService: AuthenticationService) {
  }

  handleClose() {
    this.passwordForm.reset();
    this.modalOpen = false;
  }

  handleSend() {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      this.dialogAlert = { alert: false, type: 'warning', message: 'Form invalide. Please verify fields.' };
      return;
    }

    const oldPassword = this.passwordForm.controls.oldPass.value;
    const newPassword = this.passwordForm.controls.newPass.value;

    this.authService.updatePassword(oldPassword!, newPassword!).subscribe({
      next: () => {
        this.alert.emit({ type: 'success', message: 'Password modify with success' });
        this.handleClose();
      },
      error: () => {
        this.dialogAlert = { alert: false, type: 'warning', message: 'Error during saving the new password' };
      }
    });
  }
}
