import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EMAIL_REGEX } from './../../../../utils/utils';
import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-user-item-modify',
  templateUrl: './user-item-modify.component.html',
  styleUrls: ['./user-item-modify.component.css']
})
export class UserItemModifyComponent implements OnInit, OnChanges {

  @Input() user!: User;
  @Input() isLoading!: boolean;

  userForm!: FormGroup;
  serverErrors!: Array<string>;

  constructor(
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(): void {
    this.fillForm();
  }

  createForm(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(undefined, Validators.required),
      lastName: new FormControl(undefined, Validators.required),
      email: new FormControl(undefined, 
        [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX)]
      ),
      username: new FormControl(undefined, Validators.required),
      isActive: new FormControl(true, Validators.required),
    });
  }

  fillForm(): void {
    if (this.user) {
      this.userForm.get('firstName')?.setValue(this.user.firstName);
      this.userForm.get('lastName')?.setValue(this.user.lastName);
      this.userForm.get('email')?.setValue(this.user.email);
      this.userForm.get('username')?.setValue(this.user.username);
      this.userForm.get('isActive')?.setValue(this.user.isActive);
    } 
  }

  updateUser(): void {
    this.serverErrors = [];
    const modifiedUser = this.userForm.getRawValue() as User;
    modifiedUser.id = this.user.id;
    this.userService.updateUser(modifiedUser)
      .subscribe(
        (res) => {
          this.clearFormAndGoBack();
        },
        (err) => {
          this.serverErrors = err;
        });
  }

  clearFormAndGoBack(): void {
    this.userForm.reset();
    this.serverErrors = []; 
    this.router.navigateByUrl(`admin/users`);
  }

  isFieldInvalid(fieldName: string): boolean {
    const formControl = this.userForm.get(fieldName);
    return formControl ?
      formControl?.invalid && (formControl?.dirty || formControl?.touched) :
      false;
  }

  /** Getters used for cleaner access from Template */
  get firstName() { return this.userForm.get('firstName'); };
  get lastName() { return this.userForm.get('lastName'); };
  get email() { return this.userForm.get('email'); };
  get username() { return this.userForm.get('username'); };
  get isActive() { return this.userForm.get('isActive'); };
}
