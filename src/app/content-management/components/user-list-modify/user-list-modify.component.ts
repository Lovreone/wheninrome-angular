import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-user-list-modify',
  templateUrl: './user-list-modify.component.html',
  styleUrls: ['./user-list-modify.component.css']
})
export class UserListModifyComponent implements OnInit {

  @Input() users: User[] = [];
  @Input() isLoading = true;

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  modifyItem(user: User): void  {
    this.router.navigateByUrl(`/admin/users/modify/${user.id}`);
  }

  deleteItem(user: User): void {
    // TODO: Temporary (Development only) functionality, disable for Prod
    if (confirm('Are you sure you want to delete this User?')) {
      this.userService.deleteUser(user)
        .subscribe(res => {
          if (res) {
            this.users = this.users.filter(item => item.id !== user.id);
          }
        });
    }
  }

  getFullName(user: User): string {
    return user.firstName.concat(' ', user.lastName);
  }
}
