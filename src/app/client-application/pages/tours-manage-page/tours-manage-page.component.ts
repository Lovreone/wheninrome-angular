import { Component, OnInit } from '@angular/core';
import { take, exhaustMap } from 'rxjs/operators';
import { mockResDelay } from 'src/utils/config';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { TourService } from '../../../shared/services/tour.service';
import { Tour } from './../../../shared/models/tour.model';

@Component({
  selector: 'app-tours-page',
  templateUrl: './tours-manage-page.component.html',
  styleUrls: ['./tours-manage-page.component.css']
})
export class ToursManagePageComponent implements OnInit {

  tours: Tour[] = [];
  isLoading = true;

  constructor(
    private tourService: TourService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    mockResDelay(() => {
      this.authService.getUserProfile()
        .pipe(
          take(1),
          exhaustMap((userData) => 
            this.tourService.getToursByUser(userData.userId)
          )
        ).subscribe((userTours) => {
          this.tours = userTours;
          this.isLoading = false;
        });
    })
  }
}
