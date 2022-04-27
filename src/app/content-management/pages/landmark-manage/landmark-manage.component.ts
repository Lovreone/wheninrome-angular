import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { mockResDelay } from 'src/utils/utils';
import { Landmark } from './../../../shared/models/landmark.model';
import { LandmarkService } from './../../../shared/services/landmark.service';

@Component({
  selector: 'app-landmark-manage',
  templateUrl: './landmark-manage.component.html',
  styleUrls: ['./landmark-manage.component.css']
})
export class LandmarkManageComponent implements OnInit {

  landmarkId!: string;
  landmark!: Landmark;
  isNew!: boolean;
  isLoading!: boolean;

  constructor(
    private landmarkService: LandmarkService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.landmarkId = this.route.snapshot.paramMap.get('landmarkId') || '';
    this.isNew = !this.landmarkId;
    this.isLoading = !this.isNew;
    if (this.landmarkId) {
      mockResDelay(() => {
        this.landmarkService.getLandmarkById(this.landmarkId)
          .subscribe(
            (res) => {
              this.landmark = res;
            },
            (err) => {
              // Use case: Wrong/non-existing item ID in urlPath 
              this.router.navigate(['not-found'], { relativeTo: this.route.parent }); 
            });
        this.isLoading = false
      });
    }
  }
}
