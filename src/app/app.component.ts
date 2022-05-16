import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  private userSub!: Subscription;

  constructor(
    public authService: AuthService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe((user) => {
        console.error('WHAT IS USER', user); // TODO: Remove later
        this.isLoggedIn = user ? true : false;
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  logoutUser(): void {
    this.authService.logout();
  }
 }
