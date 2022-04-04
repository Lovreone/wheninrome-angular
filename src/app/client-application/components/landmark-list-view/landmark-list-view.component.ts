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
  landmarksAll: Landmark[] = [];
  landmarks: Landmark[] = [];
  isLoading = true;

  constructor(
    private landmarkService: LandmarkService,
    private router: Router
  ) { }

  ngOnInit(): void {
    // TODO: Remove mock timeout (used to test Loader gif)
    setTimeout(()=> {
      this.landmarkService.getLandmarks().subscribe((res) => {
        if(res) {
          this.landmarksAll = res;
          this.landmarks = this.landmarksAll;
          this.isLoading = false;
        }
      });   
    }, 1000);
  }

  viewItem(landmark: Landmark): void {
    this.router.navigateByUrl(`/portal/landmarks/view/${landmark.id}`);
  }

  search(searchTerm: string) : void {
    this.landmarks = searchTerm ? 
      this.landmarksAll.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())) :
      this.landmarksAll;
  }
}
