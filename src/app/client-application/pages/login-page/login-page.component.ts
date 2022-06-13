import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, Validators, UntypedFormControl } from '@angular/forms';
import { EMAIL_REGEX } from 'src/utils/utils';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { UserLoginData } from './../../../shared/models/user.model';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: UntypedFormGroup;
  serverErrors!: Array<string>;

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = new UntypedFormGroup({
      email: new UntypedFormControl(undefined, [
        Validators.required, 
        Validators.email, 
        Validators.pattern(EMAIL_REGEX)]
      ),
      password: new UntypedFormControl(undefined, Validators.required)
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const formControl = this.loginForm.get(fieldName);
    return formControl ?
      formControl?.invalid && (formControl?.dirty || formControl?.touched) :
      false;
  }

  loginUser(): void {
    this.loginForm.disable();
    this.serverErrors = [];
    const loginData: UserLoginData = this.loginForm.getRawValue();
    this.authService.login(loginData)
      .subscribe(
        (user) => {
          this.loginForm.reset();
          this.router.navigate(['portal/user-profile/']);
        },
        (errorMessage) => {
          this.serverErrors = errorMessage;
          this.loginForm.enable();
        }
      );
  }

  /** Getters used for cleaner access from Template */
  get email() { return this.loginForm.get('email'); };
  get password() { return this.loginForm.get('password'); };
}
