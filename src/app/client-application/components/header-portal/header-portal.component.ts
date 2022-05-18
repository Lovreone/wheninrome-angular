import { AuthService } from './../../../shared/services/auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header-portal',
  templateUrl: './header-portal.component.html',
  styleUrls: ['./header-portal.component.css']
})
export class HeaderPortalComponent implements OnInit, OnDestroy {

  isLoggedIn = false;
  private userSub!: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe((user) => {this.isLoggedIn = !!user});
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
