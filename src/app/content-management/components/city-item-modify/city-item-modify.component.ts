import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CityItemModifyForm } from './../../../shared/models/forms.model';

import { CityService } from './../../../shared/services/city.service';
import { City } from './../../../shared/models/city.model';

@Component({
  selector: 'app-city-item-modify',
  templateUrl: './city-item-modify.component.html',
  styleUrls: ['./city-item-modify.component.css']
})
export class CityItemModifyComponent implements OnInit, OnChanges {

  @Input() city!: City;
  @Input() isLoading!: boolean;
  @Input() isNew!: boolean;

  cityForm!: FormGroup<CityItemModifyForm>;
  serverErrors!: Array<string>;

  constructor(
    private router: Router,
    private cityService: CityService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(): void {
    this.fillForm();
  }

  createForm(): void {
    this.cityForm = new FormGroup({
      name: new FormControl<string|null>(null, [
        Validators.required, 
        Validators.minLength(3), 
        Validators.maxLength(20)
      ]),
      slug: new FormControl<string|null>(null, [
        Validators.required, 
        Validators.minLength(3)
      ]),
      country: new FormControl<string|null>(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      featuredImage: new FormControl<string|null>(null),
      introText: new FormControl<string|null>(null, [
        Validators.required, Validators.maxLength(50)
      ]),
      localCurrency: new FormControl<string|null>(null),
      description: new FormControl<string|null>(null),
      isActive: new FormControl<boolean|null>(true, Validators.required),
    });
  }

  fillForm(): void {
    if (this.city) {
      this.cityForm.get('name')?.setValue(this.city.name);
      this.cityForm.get('slug')?.setValue(this.city.slug);
      this.cityForm.get('country')?.setValue(this.city.country);
      this.cityForm.get('featuredImage')?.setValue(this.city.featuredImage);    
      this.cityForm.get('introText')?.setValue(this.city.introText);
      this.cityForm.get('localCurrency')?.setValue(this.city.localCurrency);
      this.cityForm.get('description')?.setValue(this.city.description);
      this.cityForm.get('isActive')?.setValue(this.city.isActive);
    } 
  }

  saveCity(): void {
    this.cityForm.disable();
    const city = this.cityForm.getRawValue() as City;
    this.isNew ? this.saveNew(city) : this.saveModified(city);
  }

  saveNew(data: City): void {
    const newCity: City = data;
    this.cityService.createCity(newCity)
      .subscribe(
        (createdCity) => {
          this.clearFormAndGoBack();
        }, 
        (errorResponse) => {
          this.serverErrors = errorResponse.error.message;
          this.cityForm.enable();
        });
  }

  saveModified(data: City): void {
    const modifiedCity: City = data;
    modifiedCity.id = this.city.id;
    this.cityService.updateCity(modifiedCity)
      .subscribe(
        (updatedCity) => {
          this.clearFormAndGoBack();
        },
        (errorResponse) => {
          this.serverErrors = errorResponse.error.message;
          this.cityForm.enable();
        });
  }

  clearFormAndGoBack(): void {
    this.cityForm.reset();
    this.serverErrors = []; 
    this.router.navigateByUrl(`admin/cities`);
  }

  isFieldInvalid(fieldName: string): boolean {
    const formControl = this.cityForm.get(fieldName);
    return formControl ?
      formControl?.invalid && (formControl?.dirty || formControl?.touched) :
      false;
  }

  /** Getters used for cleaner access from Template */
  get name() { return this.cityForm.get('name'); }
  get slug() { return this.cityForm.get('slug'); }
  get country() { return this.cityForm.get('country'); }
  get featuredImage() { return this.cityForm.get('featuredImage'); }
  get introText() { return this.cityForm.get('introText'); }
  get localCurrency() { return this.cityForm.get('localCurrency'); }
  get description() { return this.cityForm.get('description'); }
  get isActive() { return this.cityForm.get('isActive'); }
}
