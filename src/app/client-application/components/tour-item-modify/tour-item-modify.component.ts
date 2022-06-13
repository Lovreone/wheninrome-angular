import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take, exhaustMap } from 'rxjs/operators';
import { getSimpleDateString, SelectOption } from 'src/utils/utils';
import { TourService } from 'src/app/shared/services/tour.service';
import { AuthService } from './../../../shared/services/auth/auth.service';
import { CityService } from './../../../shared/services/city.service';
import { Tour } from './../../../shared/models/tour.model';
import { City } from './../../../shared/models/city.model';

@Component({
  selector: 'app-tour-item-modify',
  templateUrl: './tour-item-modify.component.html',
  styleUrls: ['./tour-item-modify.component.css']
})
export class TourItemModifyComponent implements OnInit, OnChanges {

  @Input() tour!: Tour;
  @Input() isLoading!: boolean;
  @Input() isNew!: boolean;
  
  tourForm!: UntypedFormGroup;
  cities!: Array<City>;
  citySelectOptions!: Array<SelectOption>;
  serverErrors!: Array<string>;

  constructor(
    private router: Router,
    private tourService: TourService,
    private cityService: CityService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getCityOptions();
    this.createForm();
  }

  ngOnChanges(): void {
    this.fillForm();
  }

  createForm(): void {
    this.tourForm = new UntypedFormGroup({
      name: new UntypedFormControl(undefined, [Validators.required]),
      tourDate: new UntypedFormControl(undefined, Validators.required), 
      startingLocation: new UntypedFormControl(undefined, Validators.required),
      tourNotes: new UntypedFormControl(undefined),
      cityId: new UntypedFormControl(undefined, Validators.required),
    });
  }

  fillForm(): void {
    if (this.tour) {
      this.tourForm.get('name')?.setValue(this.tour.name);
      this.tourForm.get('tourDate')?.setValue(getSimpleDateString(new Date(this.tour.tourDate)));
      this.tourForm.get('startingLocation')?.setValue(this.tour.startingLocation);
      this.tourForm.get('tourNotes')?.setValue(this.tour.tourNotes);
      this.tourForm.get('cityId')?.setValue(this.tour.cityId);
    } 
  }

  saveTour(): void {
    this.tourForm.disable();
    this.serverErrors = []; 
    const tourData = this.tourForm.getRawValue() as Tour;
    this.authService.getUserProfile()
      .pipe(
        take(1),
        exhaustMap((userData) => {
          tourData.userId = userData.userId;
          tourData.tourDate = new Date(tourData.tourDate);
          if (this.isNew) {
            return this.tourService.createTour(tourData).pipe(take(1));
          } else {
            tourData.id = this.tour.id;
            return this.tourService.updateTour(tourData).pipe(take(1));
          }  
        })
      ).subscribe(
        (savedTour) => {
          this.tourForm.reset();
          this.serverErrors = []; 
          this.router.navigateByUrl(`portal/tours`);
        },
        (errorResponse) => {
          this.serverErrors = errorResponse.error.message;
          this.tourForm.enable();
        });
  }

  getCityOptions(): void {
    this.cityService.getActiveCities().subscribe((cities) => {
      this.cities = cities;
      this.citySelectOptions = cities.map(city => ({
        id: city.id,
        value: city.name
      }));
    })
  }

  isFieldInvalid(fieldName: string): boolean {
    const formControl = this.tourForm.get(fieldName);
    return formControl ?
      formControl?.invalid && (formControl?.dirty || formControl?.touched) :
      false;
  }

  /** Getters used for cleaner access from Template */
  get name() { return this.tourForm.get('name'); }
  get tourDate() { return this.tourForm.get('tourDate'); }
  get startingLocation() { return this.tourForm.get('startingLocation'); }
  get tourNotes() { return this.tourForm.get('tourNotes'); }
  get cityId() { return this.tourForm.get('cityId'); }
}
