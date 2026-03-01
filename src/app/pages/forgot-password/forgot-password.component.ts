import { Component } from '@angular/core';
import {ClrCommonFormsModule, ClrInputModule, ClrPasswordModule} from "@clr/angular";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';
import {checkLoginFields} from '../login/methods';

@Component({
  selector: 'app-forgot-password',
    imports: [
        ClrCommonFormsModule,
        ClrInputModule,
        ClrPasswordModule,
        ReactiveFormsModule
    ],
  standalone:true,
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  errorMessage: string = ""

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  handleSend() {
    const email = this.forgotForm.get('email')?.value;
    if (!email) return;
    this.authService.forgotPassword(email).subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (err: any) => {
        this.errorMessage = "Error during sending request, verify your email!";
      }
    });
  }
  }
