import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './../../../shared/services/auth/auth.service';

@Component({
  selector: 'app-user-profile-page',
  templateUrl: './user-profile-page.component.html',
  styleUrls: ['./user-profile-page.component.css']
})
export class UserProfilePageComponent implements OnInit {
 
  currentUser: Object = {};

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    //let username = this.activatedRoute.snapshot.paramMap.get('username');
    this.authService.getUserProfile().subscribe((res) => {
      console.warn('MyPROFILE: Curr user', res); // TODO: Remove
      this.currentUser = res;
    });
  }
}
