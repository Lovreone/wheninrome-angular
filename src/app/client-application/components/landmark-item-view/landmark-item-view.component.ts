import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Landmark } from '../../../shared/models/landmark.model';

@Component({
  selector: 'app-landmark-item-view',
  templateUrl: './landmark-item-view.component.html',
  styleUrls: ['./landmark-item-view.component.css']
})
export class LandmarkItemViewComponent implements OnInit, OnChanges {

  @Input() landmark!: Landmark;
  @Input() isLoading = true;

  googleMapEmbed!: SafeHtml;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {}

  ngOnChanges(): void {
    if (this.landmark && this.landmark.coordinates) {
      this.getGoogleMapsUrl()
      this.generateGoogleMap(this.landmark.coordinates);
    }
  }

  goBack(): void {
    this.router.navigateByUrl(`portal/cities/${this.landmark.city.slug}`);
  }
  getGoogleMapsUrl(): string {
    const latLngArr = this.landmark.coordinates?.split(', ') || [];
    return `https://maps.google.com/?q=${latLngArr[0]},${latLngArr[1]}`;
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