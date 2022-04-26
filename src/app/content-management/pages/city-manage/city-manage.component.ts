import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CityService } from './../../../shared/services/city.service';
import { City } from './../../../shared/models/city.model';
import { mockResDelay } from 'src/utils/utils';

@Component({
  selector: 'app-city-manage',
  templateUrl: './city-manage.component.html',
  styleUrls: ['./city-manage.component.css']
})
export class CityManageComponent implements OnInit {
  
  city!: City;
  isLoading!: boolean;
  cityId!: string;
  isNew!: boolean;

  constructor(
    private cityService: CityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cityId = this.route.snapshot.paramMap.get('cityId') || '';
    this.isNew = !this.cityId;
    this.isLoading = !this.isNew;
    if (this.cityId) {
      mockResDelay(() => {
        this.cityService.getCityById(this.cityId).subscribe(
          (res) => {
            this.city = res; 
          },
          (err) => {
            // Use case: Wrong/non-existing item ID in urlPath 
            this.router.navigate(['not-found'], { relativeTo: this.route.parent }); 
          });
          this.isLoading = false
      });
    }
  }
}
