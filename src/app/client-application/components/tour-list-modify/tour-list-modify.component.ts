import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TourService } from '../../../shared/services/tour.service';
import { Tour } from './../../../shared/models/tour.model';

@Component({
  selector: 'app-tour-list-modify',
  templateUrl: './tour-list-modify.component.html',
  styleUrls: ['./tour-list-modify.component.css']
})
export class TourListModifyComponent implements OnInit {

  @Input() tours: Array<Tour> = [];
  @Input() citiesMap!: Map<string,string>;
  @Input() isLoading = true;

  constructor(
    private tourService: TourService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  getCityName(cityId: string): string | undefined {
    return this.citiesMap.get(cityId); 
  }

  viewItem(tour: Tour): void  {
    this.router.navigateByUrl(`/portal/tours/view/${tour.id}`);
  }

  modifyItem(tour: Tour): void  {
    this.router.navigateByUrl(`/portal/tours/modify/${tour.id}`);
  }

  deleteItem(tour: Tour): void {
    if (confirm('Are you sure you want to delete this Tour? This action is irreversible!')) {
      this.tourService.deleteTour(tour)
        .subscribe(isDeleted => {
          if (isDeleted) {
            this.tours = this.tours.filter(item => item.id !== tour.id);
          }
        });
    }
  }
}
