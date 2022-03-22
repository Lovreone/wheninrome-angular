import { Landmark } from './../../../shared/models/landmark.model';
import { Router } from '@angular/router';
import { LandmarkService } from './../../../shared/services/landmark.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landmark-list-view',
  templateUrl: './landmark-list-view.component.html',
  styleUrls: ['./landmark-list-view.component.css']
})
export class LandmarkListViewComponent implements OnInit {

  landmarks: Landmark[] = [];

  constructor(
    private landmarkService: LandmarkService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.landmarkService.getLandmarks().subscribe(res => this.landmarks = res);
  }

  viewItem(landmark: Landmark): void {
    this.router.navigateByUrl(`/portal/landmarks/view/${landmark.id}`);
  }
}
