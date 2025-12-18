import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClrDropdownModule, ClrFormsModule} from '@clr/angular';
import {checkLoginFields} from './methods';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ClrFormsModule, ClrDropdownModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  errorMessage: string = ""

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  handleLogin() {
    this.errorMessage = checkLoginFields(this.loginForm);
    // if (this.errorMessage !== "") {
    //   return
    // }


    this.authService.login(this.loginForm.value).subscribe({
      next: (data) => {
        let jwToken = data.headers.get('Authorization')!;
        this.authService.saveToken(jwToken);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        console.log(err);
      }
    });

    // console.log(this.loginForm.value);
    // console.log(this.loginForm.valid);
  }

}
