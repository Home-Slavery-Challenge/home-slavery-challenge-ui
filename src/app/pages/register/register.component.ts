import { Component } from '@angular/core';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { ClrCheckboxModule, ClrCommonFormsModule, ClrInputModule, ClrPasswordModule } from '@clr/angular';
import {checkRegisterFields} from './methods';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ClrCheckboxModule,
    ClrCommonFormsModule,
    ClrInputModule,
    ClrPasswordModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  errorMessage: string=""

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
  });

  handleRegister() {
    this.errorMessage = checkRegisterFields(this.registerForm);
    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);
  }
}
