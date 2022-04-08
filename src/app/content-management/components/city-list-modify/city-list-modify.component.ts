import { LOADER_TIME } from './../../../../utils/enum';
import { Router } from '@angular/router';
import { CityService } from './../../../shared/services/city.service';
import { City } from './../../../shared/models/city.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-list-modify',
  templateUrl: './city-list-modify.component.html',
  styleUrls: ['./city-list-modify.component.css']
})
export class CityListModifyComponent implements OnInit {

  cities: City[] = [];
  isLoading = true;

  constructor(
    private cityService: CityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // TODO: Remove mock timeout (used to test Loader gif)
    setTimeout(() => {
      this.cityService.getCities()
        .subscribe(res => this.cities = res);
      this.isLoading = false;
    }, LOADER_TIME);
  }

  viewItem(city: City): void  {
    // FIXME: TBD path structure on Portal
    this.router.navigateByUrl(`/portal/cities/view/${city.slug}`);
  }

  modifyItem(city: City): void  {
    this.router.navigateByUrl(`/admin/cities/modify/${city.id}`);
  }

  deleteItem(city: City): void {
    // FIXME: TBD if I will allow Hard delete or have a Soft delete (deactivate/reactivate)
    if (confirm('Are you sure you want to delete this City?')) {
      this.cityService.deleteCity(city)
        .subscribe(res => {
          if (res) {
            this.cities = this.cities.filter(item => item.id !== city.id);
          }
        });
    }
  }
}
