import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { take, exhaustMap } from 'rxjs/operators';
import { mockResDelay } from 'src/utils/config';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
 
  currentUser!: User;
  serverError!: string;
  isLoading = true;
  isEditMode = false;

  constructor(
    public authService: AuthService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
    mockResDelay(() => {
      this.authService.getUserProfile()
        .pipe(
          take(1),
          exhaustMap((userProfile) => {
            return this.userService.getUserById(userProfile.userId)
              .pipe(take(1))
          })
        ).subscribe(
          (userData: User) => {
            this.currentUser = userData;
            this.isLoading = false;
          },
          (errorMessage) => {
            this.serverError = errorMessage;
            this.isLoading = false;
          });
        });
  }
}
