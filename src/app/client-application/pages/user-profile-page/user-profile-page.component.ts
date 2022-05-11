import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {
 
  currentUser!: ProfileResponse;

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //let username = this.activatedRoute.snapshot.paramMap.get('username');
    this.authService.getUserProfile().subscribe((res) => {
      console.warn('UserProfileComponent: get profile:', res); // TODO: Remove
      this.currentUser = res;
    });
  }
}

interface ProfileResponse {
  userId: string;
  email: string;
  issuedAt: number;
  expiresAt: number;
}