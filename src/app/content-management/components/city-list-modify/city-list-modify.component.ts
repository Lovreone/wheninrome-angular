import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CityService } from './../../../shared/services/city.service';
import { City } from './../../../shared/models/city.model';
import { Placeholders } from 'src/utils/enum';

@Component({
  selector: 'app-city-list-modify',
  templateUrl: './city-list-modify.component.html',
  styleUrls: ['./city-list-modify.component.css']
})
export class CityListModifyComponent implements OnInit {

  @Input() cities: City[] = [];
  @Input() isLoading = true;

  constructor(
    private cityService: CityService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  viewItem(city: City): void  {
    this.router.navigateByUrl(`/portal/cities/${city.slug}`);
  }

  modifyItem(city: City): void  {
    this.router.navigateByUrl(`/admin/cities/modify/${city.id}`);
  }

  deleteItem(city: City): void {
    // TODO: Temporary (Development only) functionality, disable for Prod
    if (confirm('Are you sure you want to delete this City?')) {
      this.cityService.deleteCity(city)
        .subscribe(res => {
          if (res) {
            this.cities = this.cities.filter(item => item.id !== city.id);
          }
        });
    }
  }

  getCityThumb(city: City): string {
    return city.featuredImage || Placeholders.CITY_IMAGE;
  }

  getAltText(cityName: string): string {
    return cityName + ' image';
  }
}
