import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from './../../../shared/services/auth.service';
import { EMAIL_REGEX } from 'src/utils/utils';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;
  serverErrors!: Array<string>;

  constructor(private authService: AuthService) { }

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
  
    // loginData.email, loginData.password
    this.authService.login('milmil', loginData.password).subscribe(res => {
      console.warn('LOGIN', res) 
      // 'res' Output: {access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2N…E2OH0.P2efe0fW0Epukcifbi5HXqW0OjvsmsU8QDFyQlBMpao'}
    });

    console.warn('USER', loginData);
  }

  /** Getters used for cleaner access from Template */
  get email() { return this.loginForm.get('email'); };
  get password() { return this.loginForm.get('password'); };
}
