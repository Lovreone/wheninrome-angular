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

  @Input('landmarkId') landmarkId!: string;
  
  landmark!: Landmark;

  constructor(
    private landmarkService: LandmarkService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const extractedId = this.route.snapshot.paramMap.get('landmarkId');
    this.landmarkId = extractedId ? extractedId : '';
    this.initLandmark(this.landmarkId);
  }

  private initLandmark(id: string): void {
    this.landmarkService.getLandmarkById(id)
      .subscribe(res => this.landmark = res);
  } 
}
