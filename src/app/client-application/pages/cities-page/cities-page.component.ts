import { Component, OnInit } from '@angular/core';
import { CityService } from './../../../shared/services/city.service';
import { LOADER_TIME } from './../../../../utils/enum';
import { City } from './../../../shared/models/city.model';

@Component({
  selector: 'app-cities-page',
  templateUrl: './cities-page.component.html',
  styleUrls: ['./cities-page.component.css']
})
export class CitiesPageComponent implements OnInit {

  cities: City[] = [];
  isLoading = true;

  constructor(
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    // TODO: Remove mock timeout (used to test Loader gif)
    setTimeout(()=> {
      this.cityService.getActiveCities().subscribe((res) => {
        if(res) {
          this.cities = res;
          this.isLoading = false;
        }
      });   
    }, LOADER_TIME);
  }
}
