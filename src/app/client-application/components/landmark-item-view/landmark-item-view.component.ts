import { CityService } from './../../../shared/services/city.service';
import { City } from './../../../shared/models/city.model';
import { LOADER_TIME } from './../../../../utils/enum';
import { LandmarkService } from '../../../shared/services/landmark.service';
import { Landmark } from '../../../shared/models/landmark.model';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landmark-item-view',
  templateUrl: './landmark-item-view.component.html',
  styleUrls: ['./landmark-item-view.component.css']
})
export class LandmarkItemViewComponent implements OnInit {

  @Input('landmarkSlug') landmarkSlug!: string;

  landmark!: Landmark;
  city!: City;
  isLoading = true;

  constructor(
    private landmarkService: LandmarkService,
    private cityService: CityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const extractedSlug = this.route.snapshot.paramMap.get('landmarkSlug');
    this.landmarkSlug = extractedSlug ? extractedSlug : '';
    this.initLandmark(this.landmarkSlug);
  }

  goBack(): void {
    this.router.navigateByUrl(`portal/cities/${this.city.slug}`);
  }

  private initLandmark(slug: string): void {
    // TODO: Remove mock timeout (used to test Loader gif)
    setTimeout(()=> {
      this.landmarkService.getLandmarkBySlug(slug)
        .subscribe(
          (res) => {
            this.landmark = res
            this.initCity(res.city.id);
          },
          (err) => {
            this.router.navigateByUrl('not-found');
          });
      this.isLoading = false;
    }, LOADER_TIME);
  } 

  private initCity(cityId: string): void {
    this.cityService.getCityById(cityId).subscribe((city) => {
      this.city = city;
    })
  }
}
