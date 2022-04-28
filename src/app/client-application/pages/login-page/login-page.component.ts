import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { EMAIL_REGEX } from 'src/utils/enum';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  serverErrors!: Array<string>;

  constructor() { }

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
    const loginData = this.loginForm.getRawValue();
    // TODO: Implement remaining logic
    console.warn('USER', loginData);
  }

  /** Getters used for cleaner access from Template */
  get email() { return this.loginForm.get('email'); };
  get password() { return this.loginForm.get('password'); };
}
