import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { EMAIL_REGEX } from 'src/utils/utils';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  serverErrors: Array<string> = [];

  constructor(
    private authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(undefined, [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX)]),
      password: new FormControl(undefined, Validators.required)
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const formControl = this.loginForm.get(fieldName);
    return formControl ?
      formControl?.invalid && (formControl?.dirty || formControl?.touched) :
      false;
  }

  login(): void {
    this.serverErrors = [];
    const loginData = this.loginForm.getRawValue();
    this.authService.signIn(loginData).subscribe(user => {
      console.warn('User logged in', user); // TODO: REMOVE
      this.router.navigate(['portal/user-profile/']); //  + user.username // TODO: Think if we need /id
    },(err) => {
      this.serverErrors.push(err.error.message);
    });
  }

  /** Getters used for cleaner access from Template */
  get email() { return this.loginForm.get('email'); };
  get password() { return this.loginForm.get('password'); };
}
