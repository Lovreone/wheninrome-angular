import { CityService } from './../../../shared/services/city.service';
import { City } from './../../../shared/models/city.model';
import { LOADER_TIME } from './../../../../utils/enum';
import { LandmarkService } from '../../../shared/services/landmark.service';
import { Landmark } from '../../../shared/models/landmark.model';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
  googleMapEmbed!: SafeHtml;

  constructor(
    private landmarkService: LandmarkService,
    private cityService: CityService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    const extractedSlug = this.route.snapshot.paramMap.get('landmarkSlug');
    this.landmarkSlug = extractedSlug ? extractedSlug : '';
    this.initLandmark(this.landmarkSlug);
  }

  goBack(): void {
    this.router.navigateByUrl(`portal/cities/${this.city.slug}`);
  }


  getGoogleMapsUrl(): string {
    const latLngArr = this.landmark.coordinates?.split(', ') || [];
    return `https://maps.google.com/?q=${latLngArr[0]},${latLngArr[1]}`;
  }

  private initLandmark(slug: string): void {
    // TODO: Remove mock timeout (used to test Loader gif)
    setTimeout(()=> {
      this.landmarkService.getLandmarkBySlug(slug)
        .subscribe(
          (res) => {
            this.landmark = res
            this.initCity(res.city.id);
            if (res.coordinates) {
              this.getGoogleMapsUrl()
              this.generateGoogleMap(res.coordinates);
            }
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

  // FIXME: Repack later if necessary, for now keep for eazier customization
  private generateGoogleMap(coordinates: string): void {
    const zoomLevel = 16;
    const satelliteView = '&t=k'
    const src = `https://maps.google.com/maps?q=${coordinates}&z=${zoomLevel}&output=embed${satelliteView}`
    const width = 360;
    const height = 270;
    const frameborder = 0;
    const style = 'border:0';
    const unsafeHTML = 
      `<iframe src="${src}" width="${width}" height="${height}" `+ 
      `frameborder="${frameborder}" style="${style}"></iframe>`;
    this.googleMapEmbed = this.sanitizer.bypassSecurityTrustHtml(unsafeHTML);
  }
}