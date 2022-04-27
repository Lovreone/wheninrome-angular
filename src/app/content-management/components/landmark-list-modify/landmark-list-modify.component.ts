import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LandmarkService } from '../../../shared/services/landmark.service';
import { Landmark } from '../../../shared/models/landmark.model';

@Component({
  selector: 'app-landmark-list-modify',
  templateUrl: './landmark-list-modify.component.html',
  styleUrls: ['./landmark-list-modify.component.css']
})
export class LandmarkListModifyComponent implements OnInit {

  @Input() landmarks: Landmark[] = [];
  @Input() isLoading = true;

  constructor(
    private landmarkService: LandmarkService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  viewItem(landmark: Landmark): void  {
    this.router.navigateByUrl(`/portal/cities/${landmark.city?.slug}/${landmark.slug}`);
  }

  modifyItem(landmark: Landmark): void  {
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
