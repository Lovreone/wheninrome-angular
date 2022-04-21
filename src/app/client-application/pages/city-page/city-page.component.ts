import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CityService } from './../../../shared/services/city.service';
import { LandmarkService } from './../../../shared/services/landmark.service';
import { City } from './../../../shared/models/city.model';
import { Landmark } from './../../../shared/models/landmark.model';
import { LOADER_TIME } from './../../../../utils/enum';

@Component({
  selector: 'app-city-page',
  templateUrl: './city-page.component.html',
  styleUrls: ['./city-page.component.css']
})
export class CityPageComponent implements OnInit {

  city!: City;
  landmarks: Landmark[] = [];
  fullCityName!: string;
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
          this.fullCityName = city.name
            .concat(', ', city.country)
            .toUpperCase();
          this.getCityLandmarks(city.id)
        },
        (err) => {
          this.router.navigateByUrl('not-found');
        });
    }, LOADER_TIME);
  }

  getCityLandmarks(cityId: string): void {
    this.landmarkService.getLandmarksByCity(cityId).subscribe((res) => {
      if(res) {
        this.landmarks = res;
        this.isLoading = false;
      }
    });   
  }
}
