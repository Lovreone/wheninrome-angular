import { Component, OnInit } from '@angular/core';

import { CityService } from './../../../shared/services/city.service';
import { City } from './../../../shared/models/city.model';
import { mockResDelay } from 'src/utils/utils';

@Component({
  selector: 'app-cities-manage',
  templateUrl: './cities-manage.component.html',
  styleUrls: ['./cities-manage.component.css']
})
export class CitiesManageComponent implements OnInit {

  cities: City[] = [];
  isLoading = true;

  constructor(
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    mockResDelay(() => {
      this.cityService.getAllCities()
        .subscribe(res => this.cities = res);
      this.isLoading = false;
    })
  }
}
