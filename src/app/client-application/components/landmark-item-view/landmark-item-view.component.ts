import { LOADER_TIME } from './../../../../utils/enum';
import { LandmarkService } from '../../../shared/services/landmark.service';
import { Landmark } from '../../../shared/models/landmark.model';

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-landmark-item-view',
  templateUrl: './landmark-item-view.component.html',
  styleUrls: ['./landmark-item-view.component.css']
})
export class LandmarkItemViewComponent implements OnInit {

  @Input('landmarkSlug') landmarkSlug!: string;

  landmark!: Landmark;
  isLoading = true;

  constructor(
    private landmarkService: LandmarkService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const extractedSlug = this.route.snapshot.paramMap.get('landmarkSlug');
    this.landmarkSlug = extractedSlug ? extractedSlug : '';
    this.initLandmark(this.landmarkSlug);
  }

  private initLandmark(slug: string): void {
    // TODO: Remove mock timeout (used to test Loader gif)
    setTimeout(()=> {
      this.landmarkService.getLandmarkBySlug(slug)
        .subscribe(res => this.landmark = res);
      this.isLoading = false;
    }, LOADER_TIME);
  } 
}
