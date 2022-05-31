import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-profile-view-page',
  templateUrl: './profile-view-page.component.html',
  styleUrls: ['./profile-view-page.component.css']
})
export class ProfileViewPageComponent implements OnInit {
 
  currentUser!: User;
  serverError!: string;

  constructor(
    public authService: AuthService,
    public userService: UserService
  ) { }

  ngOnInit(): void {
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
        },
        (errorMessage) => {
          this.serverError = errorMessage;
        })
  }
}
