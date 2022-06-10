import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { mockResDelay } from 'src/utils/config';
import { TourService } from './../../../shared/services/tour.service';
import { Tour } from './../../../shared/models/tour.model';

@Component({
  selector: 'app-tour-view-page',
  templateUrl: './tour-view-page.component.html',
  styleUrls: ['./tour-view-page.component.css']
})
export class TourViewPageComponent implements OnInit {

  tour!: Tour;
  isLoading!: boolean;
  tourId!: string;

  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('tourId') || '';
    this.isLoading = !!this.tourId;
    if (this.tourId) {
      mockResDelay(() => {
        this.tourService.getTourById(this.tourId)
          .subscribe(
            (fetchedTour) => {
              this.tour = fetchedTour; 
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
