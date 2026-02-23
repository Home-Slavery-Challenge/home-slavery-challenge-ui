import {Component, OnInit} from '@angular/core';
import {UserClass} from '../../types/user';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {ClrCommonFormsModule, ClrInputModule, ClrPasswordModule} from '@clr/angular';
import {checkMailVerifcationFields} from './methods';

@Component({
  selector: 'app-email-verification',
  imports: [
    FormsModule,
    ClrCommonFormsModule,
    ClrInputModule,
    ClrPasswordModule,
    ReactiveFormsModule
  ],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})

export class EmailVerificationComponent implements OnInit {

  user: UserClass = new UserClass();
  errorMessage = "";
  emailValidated = false;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.user = this.authService.getRegisteredUser();
  }


  verifForm = new FormGroup({
    code: new FormControl('', [Validators.required]),
  });

  onValidateEmail(){
    this.errorMessage = checkMailVerifcationFields(this.verifForm);
    if (this.errorMessage !== "") {
      return
    }

    this.authService.validateEmail(this.verifForm.value).subscribe({
      next: (res) => {
this.emailValidated = true;
      },
      error:(err:any) => {

        if((err.error.errorCode === "INVALID_TOKEN")){
          this.errorMessage = "Votre code n'est pas valide !"
        }

        if((err.error.errorCode === "EXPIRED_TOKEN")){
          this.errorMessage = "Votre code à expiré !"
        }
      }
    })
  }

}
