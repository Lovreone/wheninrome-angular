import { Component, OnInit } from '@angular/core';

import { LandmarkService } from './../../../shared/services/landmark.service';
import { Landmark } from './../../../shared/models/landmark.model';
import { mockResDelay } from 'src/utils/utils';

@Component({
  selector: 'app-landmarks-manage',
  templateUrl: './landmarks-manage.component.html',
  styleUrls: ['./landmarks-manage.component.css']
})
export class LandmarksManageComponent implements OnInit {

  landmarks: Landmark[] = [];
  isLoading = true;

  constructor(
    private landmarkService: LandmarkService
  ) { }

  ngOnInit(): void {
    mockResDelay(() => {
      this.landmarkService.getLandmarks()
        .subscribe(res => this.landmarks = res);
      this.isLoading = false;
    });
  }
}
