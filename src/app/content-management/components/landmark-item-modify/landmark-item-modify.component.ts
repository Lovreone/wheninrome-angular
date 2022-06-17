import { Component, OnDestroy, OnInit, OnChanges, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Landmark, NestedCity } from '../../../shared/models/landmark.model';
import { City } from './../../../shared/models/city.model';
import { LandmarkService } from '../../../shared/services/landmark.service';
import { CityService } from './../../../shared/services/city.service';
import { URL_REGEX } from 'src/utils/utils';
import { blockForbiddenChars, SelectOption } from 'src/utils/utils';

@Component({
  selector: 'app-landmark-item-modify',
  templateUrl: './landmark-item-modify.component.html',
  styleUrls: ['./landmark-item-modify.component.css']
})
export class LandmarkItemModifyComponent implements OnInit, OnChanges, OnDestroy {

  @Input() landmark!: Landmark;
  @Input() isNew!: boolean;
  @Input() isLoading!: boolean;

  landmarkForm!: UntypedFormGroup;
  cities!: Array<City>;
  citySelectOptions!: Array<SelectOption>;
  serverErrors!: Array<string>;
  cityLocalCurrency?: String;
  citySelectValChangeSub?: Subscription;
  blockForbiddenChars = blockForbiddenChars;
  
  constructor(
    private landmarkService: LandmarkService,
    private cityService: CityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCityOptions();
    this.createForm();
    this.reactOnFormChanges();
  }

  ngOnChanges(): void {
    this.fillForm();
  }

  ngOnDestroy(): void {
    this.citySelectValChangeSub?.unsubscribe(); 
  }

  createForm(): void {
    this.landmarkForm = new UntypedFormGroup({
      name: new UntypedFormControl(undefined, [Validators.required, Validators.minLength(3)]),
      slug: new UntypedFormControl(undefined, [Validators.required, Validators.minLength(3)]),
      introText: new UntypedFormControl(undefined, [Validators.required, Validators.maxLength(50)]),
      description: new UntypedFormControl(undefined),
      entranceFee: new UntypedFormControl(undefined, Validators.min(0)),
      officialWebsite: new UntypedFormControl(undefined, Validators.pattern(URL_REGEX)),
      featuredImage: new UntypedFormControl(undefined),
      howToArrive: new UntypedFormControl(undefined),
      workingDays: new UntypedFormControl(undefined),
      workingHours: new UntypedFormControl(undefined),
      coordinates: new UntypedFormControl(undefined),
      city: new UntypedFormControl(undefined, Validators.required),
      isActive: new UntypedFormControl(true, Validators.required)
    });
  }

  fillForm(): void {
    if (this.landmark) {
      this.landmarkForm.get('name')?.setValue(this.landmark.name);
      this.landmarkForm.get('slug')?.setValue(this.landmark.slug);
      this.landmarkForm.get('introText')?.setValue(this.landmark.introText);
      this.landmarkForm.get('description')?.setValue(this.landmark.description);
      this.landmarkForm.get('entranceFee')?.setValue(this.landmark.entranceFee);
      this.landmarkForm.get('officialWebsite')?.setValue(this.landmark.officialWebsite);
      this.landmarkForm.get('featuredImage')?.setValue(this.landmark.featuredImage);
      this.landmarkForm.get('howToArrive')?.setValue(this.landmark.howToArrive);
      this.landmarkForm.get('workingDays')?.setValue(this.landmark.workingDays);
      this.landmarkForm.get('workingHours')?.setValue(this.landmark.workingHours);
      this.landmarkForm.get('coordinates')?.setValue(this.landmark.coordinates);
      this.landmarkForm.get('city')?.setValue(this.landmark.city.id);
      this.landmarkForm.get('isActive')?.setValue(this.landmark.isActive);
    }
  }

  reactOnFormChanges(): void {
    this.citySelectValChangeSub = this.landmarkForm.get('city')?.valueChanges
      .subscribe(cityId => {
        const selectedCity = this.cities.find(city => city.id === cityId);
        this.cityLocalCurrency = selectedCity?.localCurrency;
      });
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
    this.landmarkForm.disable();
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
        (createdLandmark) => {
          this.clearFormAndGoBack();
        }, 
        (errorResponse) => {
          this.serverErrors = errorResponse.error.message;
          this.landmarkForm.enable();
        });
  }

  saveModified(data: Landmark): void {
    const modifiedLandmark: Landmark = data;
    modifiedLandmark.id = this.landmark.id;
    this.landmarkService.updateLandmark(modifiedLandmark)
      .subscribe(
        (udpatedLandmark) => {
          this.clearFormAndGoBack();
        },
        (errorResponse) => {
          this.serverErrors = errorResponse.error.message;
          this.landmarkForm.enable();
        });
  }

  clearFormAndGoBack(): void {
    this.landmarkForm.reset();
    this.serverErrors = []; 
    this.router.navigateByUrl(`admin/landmarks`);
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
