import { Component, OnInit } from '@angular/core';

import { CityService } from './../../../shared/services/city.service';
import { City } from './../../../shared/models/city.model';
import { mockResDelay } from 'src/utils/utils';

@Component({
  selector: 'app-cities-page',
  templateUrl: './cities-page.component.html',
  styleUrls: ['./cities-page.component.css']
})
export class CitiesPageComponent implements OnInit {

  cities: City[] = [];
  isLoading = true;
  mockResDelay = mockResDelay;

  constructor(
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    mockResDelay(() => {
      this.cityService.getActiveCities().subscribe((res) => {
        if(res) {
          this.cities = res;
          this.isLoading = false;
        }
      });   
    });
  }
}
