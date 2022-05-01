import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { LandmarkService } from '../../../shared/services/landmark.service';
import { Landmark } from '../../../shared/models/landmark.model';

@Component({
  selector: 'app-landmark-list-modify',
  templateUrl: './landmark-list-modify.component.html',
  styleUrls: ['./landmark-list-modify.component.css']
})
export class LandmarkListModifyComponent implements OnInit, OnChanges {

  @ViewChild('searchTerm') searchTerm!: ElementRef<HTMLInputElement>;
  @Input() landmarks: Landmark[] = [];
  @Input() isLoading = true;

  fileredLandmarks: Landmark[] = [];

  constructor(
    private landmarkService: LandmarkService,
    private router: Router
  ) { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.fileredLandmarks = this.landmarks;
  }

  viewItem(landmark: Landmark): void  {
    this.router.navigateByUrl(`/portal/cities/${landmark.city?.slug}/${landmark.slug}`);
  }

  modifyItem(landmark: Landmark): void  {
    this.router.navigateByUrl(`/admin/landmarks/modify/${landmark.id}`);
  }

  searchByName(searchTerm: string): void {
    this.fileredLandmarks = searchTerm ? 
      this.landmarks.filter((item) => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())) :
      this.landmarks;
  }

  resetSearchFilter(): void {
    this.searchTerm.nativeElement.value = '';
    this.fileredLandmarks = this.landmarks;
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
