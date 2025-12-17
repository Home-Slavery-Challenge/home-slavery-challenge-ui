import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClrDropdownModule, ClrFormsModule} from '@clr/angular';
import {checkLoginFields} from './methods';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ClrFormsModule, ClrDropdownModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    console.log(this.loginForm);
  }

  errorMessage: string = ""

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
  });

  handleLogin() {
    this.errorMessage = checkLoginFields(this.loginForm);
    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
  }

}
