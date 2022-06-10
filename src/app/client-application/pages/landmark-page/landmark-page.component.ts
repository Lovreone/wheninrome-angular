import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LandmarkService } from './../../../shared/services/landmark.service';
import { Landmark } from './../../../shared/models/landmark.model';
import { mockResDelay } from 'src/utils/config';

@Component({
  selector: 'app-landmark-page',
  templateUrl: './landmark-page.component.html',
  styleUrls: ['./landmark-page.component.css']
})
export class LandmarkPageComponent implements OnInit {

  landmarkSlug!: string;
  landmark!: Landmark;
  fullLandmarkName!: string;
  isLoading = true;

  constructor(
    private landmarkService: LandmarkService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const extractedSlug = this.route.snapshot.paramMap.get('landmarkSlug');
    this.landmarkSlug = extractedSlug ? extractedSlug : '';
    this.initLandmark(this.landmarkSlug);
  }

  private initLandmark(slug: string): void {
    mockResDelay(()=> {
      this.landmarkService.getLandmarkBySlug(slug)
        .subscribe(
          (fetchedLandmark) => {
            this.landmark = fetchedLandmark;
            this.fullLandmarkName = fetchedLandmark.name
              .concat(', ', fetchedLandmark.city.name)
              .toUpperCase();
          },
          (errorResponse) => {
            this.router.navigateByUrl('not-found');
          });
      this.isLoading = false;
    });
  } 
}
