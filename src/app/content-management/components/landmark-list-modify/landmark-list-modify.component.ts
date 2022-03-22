import { LandmarkService } from '../../../shared/services/landmark.service';
import { Landmark } from '../../../shared/models/landmark.model';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landmark-list-modify',
  templateUrl: './landmark-list-modify.component.html',
  styleUrls: ['./landmark-list-modify.component.css']
})
export class LandmarkListModifyComponent implements OnInit {

  landmarks: Landmark[] = [];

  constructor(
    private landmarkService: LandmarkService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.landmarkService.getLandmarks().subscribe(res => this.landmarks = res);
  }

  viewItem(landmark: Landmark) {
    this.router.navigateByUrl(`/portal/landmarks/view/${landmark.id}`);
  }

  modifyItem(landmark: Landmark) {
    this.router.navigateByUrl(`/admin/landmarks/modify/${landmark.id}`);
  }

  deleteItem(landmark: Landmark): void {
    if (confirm('Are you sure you want to delete this Landmark?')) {
      this.landmarkService.deleteLandmark(landmark)
        .subscribe(res => {
          if (res) {
            this.landmarks = this.landmarks.filter(item => item.id !== landmark.id);
          }
        });
    }
  }

}
