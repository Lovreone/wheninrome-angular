import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mockResDelay } from 'src/utils/config';
import { TourService } from 'src/app/shared/services/tour.service';
import { Tour } from './../../../shared/models/tour.model';

@Component({
  selector: 'app-tour-manage-page',
  templateUrl: './tour-manage-page.component.html',
  styleUrls: ['./tour-manage-page.component.css']
})
export class TourManagePageComponent implements OnInit {

  tour!: Tour;
  isLoading!: boolean;
  tourId!: string;
  isNew!: boolean;

  constructor(
    private tourService: TourService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('tourId') || '';
    this.isNew = !this.tourId;
    this.isLoading = !this.isNew;
    if (this.tourId) {
      mockResDelay(() => {
        this.tourService.getTourById(this.tourId).subscribe(
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
