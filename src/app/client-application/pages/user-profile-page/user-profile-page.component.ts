import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {
 
  currentUser!: ProfileResponse;
  serverError!: string;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.getUserProfile()
      .subscribe(
        (res) => {
          console.warn('UserProfileComponent: get profile:', res); // TODO: Remove
          this.currentUser = res;
        },
        (errorMessage) => {
          this.serverError = errorMessage;
        }
      );
  }
}

interface ProfileResponse {
  userId: string;
  email: string;
  issuedAt: number;
  expiresAt: number;
}