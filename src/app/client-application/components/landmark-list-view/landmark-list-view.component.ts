import { Component, Input, OnInit, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { City } from './../../../shared/models/city.model';
import { Landmark } from './../../../shared/models/landmark.model';
import { Placeholders } from 'src/utils/enum';

@Component({
  selector: 'app-landmark-list-view',
  templateUrl: './landmark-list-view.component.html',
  styleUrls: ['./landmark-list-view.component.css']
})
export class LandmarkListViewComponent implements OnInit, OnChanges {

  @ViewChild('searchTerm') searchTerm!: ElementRef<HTMLInputElement>;
  @Input() city!: City;
  @Input() landmarks: Landmark[] = [];
  @Input() isLoading = true;

  fileredLandmarks: Landmark[] = [];
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  ngOnChanges(): void {
    this.fileredLandmarks = this.landmarks;
  }

  viewItem(landmark: Landmark): void {
    this.router.navigateByUrl(`/portal/cities/${landmark.city.slug}/${landmark.slug}`);
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
  
  getCityThumbnail(city: City): string {
    return city.featuredImage || Placeholders.CITY_IMAGE;
  }

  getLandmarkThumbnail(landmark: Landmark): string {
    return landmark.featuredImage || Placeholders.LANDMARK_IMAGE;
  }

  getAltText(cityName: string): string {
    return cityName + ' image';
  }
}
