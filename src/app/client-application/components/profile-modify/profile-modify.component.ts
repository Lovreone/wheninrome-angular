import { Component, Input, OnInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EMAIL_REGEX } from './../../../../utils/utils';
import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-profile-modify',
  templateUrl: './profile-modify.component.html',
  styleUrls: ['./profile-modify.component.css']
})
export class ProfileModifyComponent implements OnInit, OnChanges {

  @Input() isLoading!: boolean;
  @Input() user!: User;
  @Output() isEditMode = new EventEmitter<boolean>();
  @Output() updatedUser = new EventEmitter<User>();

  profileForm!: FormGroup;
  serverErrors!: Array<string>;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.createForm();
    this.fillForm();
  }

  createForm(): void {
    this.profileForm = new FormGroup({
      firstName: new FormControl(undefined, Validators.required),
      lastName: new FormControl(undefined, Validators.required),
      email: new FormControl(undefined, 
        [Validators.required, Validators.email, Validators.pattern(EMAIL_REGEX)]
      ),
      username: new FormControl(undefined, Validators.required),
    });
  }

  fillForm(): void {
    if (this.user && this.profileForm) {
      this.profileForm.get('firstName')?.setValue(this.user.firstName);
      this.profileForm.get('lastName')?.setValue(this.user.lastName);
      this.profileForm.get('email')?.setValue(this.user.email);
      this.profileForm.get('username')?.setValue(this.user.username);
    } 
  }

  updateProfile(): void {
    this.profileForm.disable();
    this.serverErrors = [];
    const modifiedUser = this.profileForm.getRawValue() as User;
    modifiedUser.id = this.user.id;
    modifiedUser.isActive = true; // For now user cant disable his profile
    this.userService.updateUser(modifiedUser)
      .subscribe(
        (changedUser) => {
          this.updatedUser.emit(changedUser);
          this.clearFormAndGoBack();
        },
        (errorResponse) => {
          this.serverErrors = errorResponse;
          this.profileForm.enable();
        });
  }

  clearFormAndGoBack(): void {
    this.profileForm.reset();
    this.serverErrors = []; 
    this.isEditMode.emit(false);
  }

  isFieldInvalid(fieldName: string): boolean {
    const formControl = this.profileForm.get(fieldName);
    return formControl ?
      formControl?.invalid && (formControl?.dirty || formControl?.touched) :
      false;
  }

  /** Getters used for cleaner access from Template */
  get firstName() { return this.profileForm.get('firstName'); };
  get lastName() { return this.profileForm.get('lastName'); };
  get email() { return this.profileForm.get('email'); };
  get username() { return this.profileForm.get('username'); };
}
