import {Component} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClrCheckboxModule, ClrCommonFormsModule, ClrInputModule, ClrPasswordModule} from '@clr/angular';
import {checkRegisterFields} from './methods';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

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

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  errorMessage: string = ""

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    username: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(25)]),
  });

  handleRegister() {
    this.errorMessage = checkRegisterFields(this.registerForm);
    if (this.errorMessage !== "") {
      return
    }

    this.authService.registerUser(this.registerForm.value).subscribe({
      next: (data) => {
        this.router.navigate(["/email-verification"])
      },
      error: (err: any) => {
        this.errorMessage = "Error during register, verify fields !";
      }
    });

  }
}
