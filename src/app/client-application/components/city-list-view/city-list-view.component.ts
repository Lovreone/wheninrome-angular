import { LOADER_TIME } from './../../../../utils/enum';
import { Router } from '@angular/router';
import { CityService } from './../../../shared/services/city.service';
import { City } from './../../../shared/models/city.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-list-view',
  templateUrl: './city-list-view.component.html',
  styleUrls: ['./city-list-view.component.css']
})
export class CityListViewComponent implements OnInit {
  cities: City[] = [];
  isLoading = true;
  
  constructor(
    private cityService: CityService,
    private router: Router
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

  viewItem(city: City): void {
    this.router.navigateByUrl(`/portal/cities/${city.slug}`);
  }

  getCityThumbnail(cityImgPath: string): string {
    return cityImgPath || '/assets/images/placeholder-thumb-city.png'
  }
}
