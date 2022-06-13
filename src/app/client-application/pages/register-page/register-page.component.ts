import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormGroup, Validators, UntypedFormControl, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { UserRegisterData } from './../../../shared/models/user.model';
import { EMAIL_REGEX } from 'src/utils/utils';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {

  registerForm!: UntypedFormGroup;
  serverErrors!: Array<string>;

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.registerForm = new UntypedFormGroup({
      firstName: new UntypedFormControl(undefined, Validators.required),
      lastName: new UntypedFormControl(undefined, Validators.required),
      email: new UntypedFormControl(undefined, [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX)]),
      username: new UntypedFormControl(undefined, Validators.required),
      passGroup: new UntypedFormGroup({
        enterPassword: new UntypedFormControl(undefined, Validators.required),
        repeatPassword: new UntypedFormControl(undefined, Validators.required)
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
    this.registerForm.disable();
    this.serverErrors = [];
    const registerData = this.registerForm.getRawValue();
    const userData = {
      email: registerData.email,
      password: registerData?.passGroup?.enterPassword,
      username: registerData.username,
      firstName: registerData.firstName,
      lastName: registerData.lastName,
    } as UserRegisterData;
    this.authService.register(userData)
      .subscribe(
        (user) => {
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        (errorMessage) => {
          this.serverErrors = errorMessage;
          this.registerForm.enable();
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
