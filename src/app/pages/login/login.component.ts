import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ClrFormsModule, ClrDropdownModule } from '@clr/angular';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ClrFormsModule, ClrDropdownModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form = {
    username: '',
    password: '',
    rememberMe: false,
  };

  handleLogin(){
    console.log(this.form);
  }

}
