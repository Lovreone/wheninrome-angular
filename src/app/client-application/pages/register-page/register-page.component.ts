import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';
import { EMAIL_REGEX } from 'src/utils/utils';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm!: FormGroup;
  serverErrors!: Array<string>;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = new FormGroup({
      firstName: new FormControl(undefined, Validators.required),
      lastName: new FormControl(undefined, Validators.required),
      email: new FormControl(undefined, [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX)]),
      username: new FormControl(undefined, Validators.required),
      passGroup: new FormGroup({
        enterPassword: new FormControl(undefined, Validators.required),
        repeatPassword: new FormControl(undefined, Validators.required)
      }, this.passMatchValidator)
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const formControl = this.registerForm.get(fieldName);
    return formControl ?
      formControl?.invalid && (formControl?.dirty || formControl?.touched) :
      false;
  }

  passMatchValidator(control: AbstractControl): ValidationErrors | null { 
    const enterPassVal = control.get('enterPassword')?.value;
    const repeatPassVal = control.get('repeatPassword')?.value;
    return (enterPassVal && repeatPassVal) && enterPassVal !== repeatPassVal ?
      { invalid: true } 
      : null;
  }

  register(): void {
    const registerData = this.registerForm.getRawValue();
    console.warn('USER', registerData);
    // TODO: Implement remaining logic
    const userData: User = {
      username: registerData.username,
      email: registerData.email,
      password: registerData?.passGroup?.enterPassword,
      firstName: registerData.firstName,
      lastName: registerData.lastName
    }
    this.userService.registerNewUser(userData)
      .subscribe(
        (user) => {
          console.error('User created', user); // TODO: Remove log, clear form, login and redirect user
        },
        (err) => {
          this.serverErrors = err.error.message;
        }
      );
  }

  /** Getters used for cleaner access from Template */
  get firstName() { return this.registerForm.get('firstName'); };
  get lastName() { return this.registerForm.get('lastName'); };
  get email() { return this.registerForm.get('email'); };
  get username() { return this.registerForm.get('username'); };
  get passGroup() { return this.registerForm.get('passGroup'); };
  get enterPassword() { return this.registerForm.get('passGroup.enterPassword'); };
  get repeatPassword() { return this.registerForm.get('passGroup.repeatPassword'); };
}
