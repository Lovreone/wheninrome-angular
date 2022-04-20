import { CityService } from './../../../shared/services/city.service';
import { LandmarkService } from './../../../shared/services/landmark.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumbs-menu',
  templateUrl: './breadcrumbs-menu.component.html',
  styleUrls: ['./breadcrumbs-menu.component.css']
})
export class BreadcrumbsMenuComponent implements OnInit {

  isLandmarkPage!: boolean;
  isCityPage!: boolean;
  citySlug!: string;
  cityName!: string;
  landmarkSlug!: string;
  landmarkName!: string;

  constructor(   
    private route: ActivatedRoute,
    private landmarkService: LandmarkService,
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    this.isLandmarkPage = 
      routeParams.hasOwnProperty('landmarkSlug')
    this.isCityPage = 
      routeParams.hasOwnProperty('citySlug') && 
      !routeParams.hasOwnProperty('landmarkSlug')

    if (this.isLandmarkPage) {
      this.landmarkService.getLandmarkBySlug(routeParams.landmarkSlug)
        .subscribe(res => {
          this.citySlug = routeParams.citySlug;
          this.landmarkSlug = routeParams.landmarkSlug;
          this.landmarkName = res.name; 
          this.cityName = res.city.name;
        });
    } else if (this.isCityPage) {
      this.cityService.getCityBySlug(routeParams.citySlug)
        .subscribe(res => {
          this.citySlug = routeParams.citySlug;
          this.cityName = res.name; 
        });
    }
  }
}
