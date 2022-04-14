import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CityService } from './../../../shared/services/city.service';
import { LandmarkService } from './../../../shared/services/landmark.service';

import { LOADER_TIME } from './../../../../utils/enum';
import { City } from './../../../shared/models/city.model';
import { Landmark } from './../../../shared/models/landmark.model';

@Component({
  selector: 'app-landmark-list-view',
  templateUrl: './landmark-list-view.component.html',
  styleUrls: ['./landmark-list-view.component.css']
})
export class LandmarkListViewComponent implements OnInit {
  landmarksAll: Landmark[] = [];
  landmarks: Landmark[] = [];
  city!: City;
  isLoading = true;

  constructor(
    private landmarkService: LandmarkService,
    private cityService: CityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const extractedSlug = this.route.snapshot.paramMap.get('citySlug') || '';
    // TODO: Remove mock timeout (used to test Loader gif)
    setTimeout(()=> {
      this.cityService.getCityBySlug(extractedSlug).subscribe(
        (city) => {
          this.city = city;
          this.getCityLandmarks(city.id)
        },
        (err) => {
          // TODO: Find an optimal solution, Error only happens if user messes with the city slug in url
          this.router.navigateByUrl('**'); 
        });
    }, LOADER_TIME);
  }

  getCityLandmarks(cityId: string): void {
    this.landmarkService.getLandmarksByCity(cityId).subscribe((res) => {
      if(res) {
        this.landmarksAll = res;
        this.landmarks = this.landmarksAll;
        this.isLoading = false;
      }
    });   
  }

  viewItem(landmark: Landmark): void {
    this.router.navigateByUrl(`/portal/landmarks/${landmark.slug}`);
  }

  search(searchTerm: string): void {
    this.landmarks = searchTerm ? 
      this.landmarksAll.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())) :
      this.landmarksAll;
  }
}
