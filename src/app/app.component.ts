import { AuthService } from './shared/services/auth/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(
    public authService: AuthService
  ) {}

  logoutUser(): void {
    this.authService.logout();
  }
 }
