import { Component, OnInit } from '@angular/core';

import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';
import { mockResDelay } from 'src/utils/config';

@Component({
  selector: 'app-users-manage',
  templateUrl: './users-manage.component.html',
  styleUrls: ['./users-manage.component.css']
})
export class UsersManageComponent implements OnInit {

  users: User[] = [];
  isLoading = true;

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    mockResDelay(() => {
      this.userService.getAllUsers()
        .subscribe(users => this.users = users);
      this.isLoading = false;
    });
  }
}
