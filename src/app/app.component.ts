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

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Auto-login early in the app lifecycle
    this.authService.autoLogin();

    this.userSub = this.authService.user
      .subscribe((user) => {
        console.warn('USER STATE:', user); // TODO: Remove later
        this.isLoggedIn = user ? true : false;
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
  }
 }
