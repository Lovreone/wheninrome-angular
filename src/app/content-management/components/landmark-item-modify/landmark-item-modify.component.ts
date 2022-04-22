import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LOADER_TIME, SelectOption, URL_REGEX } from './../../../../utils/enum';
import { Landmark, NestedCity } from '../../../shared/models/landmark.model';
import { City } from './../../../shared/models/city.model';
import { LandmarkService } from '../../../shared/services/landmark.service';
import { CityService } from './../../../shared/services/city.service';


@Component({
  selector: 'app-landmark-item-modify',
  templateUrl: './landmark-item-modify.component.html',
  styleUrls: ['./landmark-item-modify.component.css']
})
export class LandmarkItemModifyComponent implements OnInit {

  landmarkForm!: FormGroup;
  serverErrors!: Array<string>;
  landmarkId!: string;
  landmark!: Landmark;
  cities!: Array<City>;
  citySelectOptions!: Array<SelectOption>;
  isNew!: boolean;
  isLoading!: boolean;

  constructor(
    private landmarkService: LandmarkService,
    private cityService: CityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.landmarkId = this.route.snapshot.paramMap.get('landmarkId') || '';
    this.isNew = !this.landmarkId;
    this.isLoading = !this.isNew;
    this.getCityOptions();
    
    this.createForm();
    this.fillForm();
  }

  createForm(): void {
    this.landmarkForm = new FormGroup({
      name: new FormControl(undefined, [Validators.required, Validators.minLength(3)]),
      slug: new FormControl(undefined, [Validators.required, Validators.minLength(3)]),
      introText: new FormControl(undefined, Validators.required),
      description: new FormControl(undefined),
      entranceFee: new FormControl(undefined, [Validators.required, Validators.min(0)]),
      officialWebsite: new FormControl(undefined, Validators.pattern(URL_REGEX)),
      featuredImage: new FormControl(undefined),
      howToArrive: new FormControl(undefined),
      workingDays: new FormControl(undefined),
      workingHours: new FormControl(undefined),
      coordinates: new FormControl(undefined),
      city: new FormControl(undefined, Validators.required),
      isActive: new FormControl(undefined, Validators.required)
    });
  }

  fillForm(): void {
    if (!this.isNew) {
      // TODO: Remove mock timeout (used to test Loader gif)
      setTimeout(() => {
        this.landmarkService.getLandmarkById(this.landmarkId)
          .subscribe(
            (res) => {
              this.landmark = res;
              this.landmarkForm.get('name')?.setValue(res.name);
              this.landmarkForm.get('slug')?.setValue(res.slug);
              this.landmarkForm.get('introText')?.setValue(res.introText);
              this.landmarkForm.get('description')?.setValue(res.description);
              this.landmarkForm.get('entranceFee')?.setValue(res.entranceFee);
              this.landmarkForm.get('officialWebsite')?.setValue(res.officialWebsite);
              this.landmarkForm.get('featuredImage')?.setValue(res.featuredImage);
              this.landmarkForm.get('howToArrive')?.setValue(res.howToArrive);
              this.landmarkForm.get('workingDays')?.setValue(res.workingDays);
              this.landmarkForm.get('workingHours')?.setValue(res.workingHours);
              this.landmarkForm.get('coordinates')?.setValue(res.coordinates);
              this.landmarkForm.get('city')?.setValue(res.city.id);
              this.landmarkForm.get('isActive')?.setValue(res.isActive);
            },
            (err) => {
              /* FIXME: 
              Is there is a better way to redirect to NotFound then pointing to a non-existing route? 
              Use case: User changed mongo id in urlPath to an invalid one */
              this.router.navigate(['landmark-not-found'], { relativeTo: this.route.parent }); 
            });
      this.isLoading = false
      }, LOADER_TIME);
    } else { 
      this.landmarkForm?.reset();
    }
  }

  getCityOptions(): void {
    this.cityService.getAllCities().subscribe((cities) => {
      this.cities = cities;
      this.citySelectOptions = cities.map(city => ({
        id: city.id,
        value: city.name
      }));
    })
  }

  saveLandmark(): void {
    const formValue = this.landmarkForm.getRawValue(); 
    const landmarkCity = this.cities
      .find(city => city.id === formValue.city);
    const nestedCityData: NestedCity = {
      id: formValue.city,
      name: landmarkCity?.name!,
      slug: landmarkCity?.slug!,
      isActive: landmarkCity?.isActive!
    }
    const landmark: Landmark = {
      id: formValue.id,
      name: formValue.name,
      slug: formValue.slug,
      introText: formValue.introText,
      description: formValue.description,
      entranceFee: formValue.entranceFee,
      officialWebsite: formValue.officialWebsite,
      featuredImage: formValue.featuredImage,
      howToArrive: formValue.howToArrive,
      workingDays: formValue.workingDays,
      workingHours: formValue.workingHours,
      coordinates: formValue.coordinates,
      city: nestedCityData,
      isActive: formValue.isActive
    }
    this.isNew ? 
      this.saveNew(landmark) :
      this.saveModified(landmark);
  }

  saveNew(data: Landmark): void {
    const newLandmark: Landmark = data;
    this.landmarkService.createLandmark(newLandmark)
      .subscribe(
        (res) => {
          newLandmark.id = res.id;
          console.warn('New Landmark created', res); // FIXME: Remove
          // TODO: Reset form & show success message || redirect to list 
          this.serverErrors = [];
        }, 
        (err) => {
          this.serverErrors = err.error.message;
        });
  }

  saveModified(data: Landmark): void {
    const modifiedLandmark: Landmark = data;
    modifiedLandmark.id = this.landmarkId;
    this.landmarkService.updateLandmark(modifiedLandmark)
      .subscribe(
        (res) => {
          console.warn('Landmark was updated', res); // FIXME: Remove
          // TODO: Reset form & show success message || redirect to list
          this.serverErrors = [];
        },
        (err) => {
          this.serverErrors = err.error.message;
        });
  }

  isFieldInvalid(fieldName: string): boolean {
    const formControl = this.landmarkForm.get(fieldName);
    return formControl ?
      formControl?.invalid && (formControl?.dirty || formControl?.touched) :
      false;
  }

  /** Getters used for cleaner access from Template */
  get name() { return this.landmarkForm.get('name'); }
  get slug() { return this.landmarkForm.get('slug'); }
  get introText() { return this.landmarkForm.get('introText'); }
  get description() { return this.landmarkForm.get('description'); }
  get entranceFee() { return this.landmarkForm.get('entranceFee'); }
  get officialWebsite() { return this.landmarkForm.get('officialWebsite'); }
  get featuredImage() { return this.landmarkForm.get('featuredImage'); }
  get howToArrive() { return this.landmarkForm.get('howToArrive'); }
  get workingDays() { return this.landmarkForm.get('workingDays'); }
  get workingHours() { return this.landmarkForm.get('workingHours'); }
  get coordinates() { return this.landmarkForm.get('coordinates'); }
  get city() { return this.landmarkForm.get('city'); }
  get isActive() { return this.landmarkForm.get('isActive'); }
}
