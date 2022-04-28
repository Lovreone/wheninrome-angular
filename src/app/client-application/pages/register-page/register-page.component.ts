import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

import { EMAIL_REGEX } from 'src/utils/enum';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;
  serverErrors!: Array<string>;

  constructor() { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(undefined, Validators.required),
      lastName: new FormControl(undefined, Validators.required),
      email: new FormControl(undefined, [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX)]),
      password: new FormControl(undefined, Validators.required),
      repeatPassword: new FormControl(undefined, Validators.required)
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const formControl = this.registerForm.get(fieldName);
    return formControl ?
      formControl?.invalid && (formControl?.dirty || formControl?.touched) :
      false;
  }

  register(): void {
    const registerData = this.registerForm.getRawValue();
    // TODO: Implement remaining logic
    console.warn('USER', registerData);
  }

  /** Getters used for cleaner access from Template */
  get firstName() { return this.registerForm.get('firstName'); };
  get lastName() { return this.registerForm.get('lastName'); };
  get email() { return this.registerForm.get('email'); };
  get password() { return this.registerForm.get('password'); };
  get repeatPassword() { return this.registerForm.get('repeatPassword'); };
}
