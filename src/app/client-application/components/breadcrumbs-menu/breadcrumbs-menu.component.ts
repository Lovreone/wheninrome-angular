import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { City } from './../../../shared/models/city.model';
import { Landmark } from './../../../shared/models/landmark.model';

@Component({
  selector: 'app-breadcrumbs-menu',
  templateUrl: './breadcrumbs-menu.component.html',
  styleUrls: ['./breadcrumbs-menu.component.css']
})
export class BreadcrumbsMenuComponent implements OnInit, OnChanges {

  @Input() landmark?: Landmark;
  @Input() city?: City; 
  @Input() isLoading = true;

  citySlug!: string;
  cityName!: string;
  landmarkSlug!: string;
  landmarkName!: string;
  isLandmarkPage!: boolean;
  isCityPage!: boolean;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.params;
    this.isLandmarkPage = 
      routeParams.hasOwnProperty('landmarkSlug')
    this.isCityPage = 
      routeParams.hasOwnProperty('citySlug') && 
      !routeParams.hasOwnProperty('landmarkSlug')
  }

  ngOnChanges(): void {
    if (this.isLandmarkPage && this.landmark) {
      this.landmarkName = this.landmark.name;
      this.landmarkSlug = this.landmark.slug;
      this.cityName = this.landmark.city.name;
      this.citySlug = this.landmark.city.slug;
    } else if (this.isCityPage && this.city) {
      this.cityName = this.city.name;
      this.citySlug = this.city.slug;
    }
  }
}
