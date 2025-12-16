import { Component } from '@angular/core';
import {ClrCheckboxModule, ClrCommonFormsModule, ClrInputModule, ClrPasswordModule} from '@clr/angular';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    ClrCheckboxModule,
    ClrCommonFormsModule,
    ClrInputModule,
    ClrPasswordModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  form = {
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  handleRegister(){
    console.log(this.form);
  }

}
