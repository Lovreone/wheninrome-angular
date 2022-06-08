import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mockResDelay } from 'src/utils/config';
import { UserService } from './../../../shared/services/user.service';
import { User } from './../../../shared/models/user.model';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {

  user!: User;
  userId!: string;
  isLoading = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId') || '';
    if (this.userId) {
      mockResDelay(() => {
        this.userService.getUserById(this.userId)
          .subscribe(
            (fetchedUser) => {
              this.user = fetchedUser; 
            },
            (errorResponse) => {
              // Use case: Wrong/non-existing item ID in urlPath 
              this.router.navigate(['not-found'], { relativeTo: this.route.parent }); 
            });
        this.isLoading = false;
      });
    }
  }
}
