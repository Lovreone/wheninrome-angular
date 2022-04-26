import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { City } from './../../../shared/models/city.model';
import { Placeholders } from 'src/utils/enum';

@Component({
  selector: 'app-city-list-view',
  templateUrl: './city-list-view.component.html',
  styleUrls: ['./city-list-view.component.css']
})
export class CityListViewComponent implements OnInit {
  @Input() cities: City[] = [];
  @Input() isLoading = true;
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  viewItem(city: City): void {
    this.router.navigateByUrl(`/portal/cities/${city?.slug}`);
  }

  getFullCityName(city: City): string {
    return city.name
    .concat(', ', city.country)
    .toUpperCase();
  }

  getCityThumbnail(cityImgPath: string): string {
    return cityImgPath || Placeholders.CITY_IMAGE;
  }

  getAltText(cityName: string): string {
    return cityName + ' image';
  }
}
