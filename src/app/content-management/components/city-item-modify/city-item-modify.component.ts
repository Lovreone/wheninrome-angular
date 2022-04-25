import { City } from './../../../shared/models/city.model';
import { LOADER_TIME } from './../../../../utils/enum';
import { ActivatedRoute, Router } from '@angular/router';
import { CityService } from './../../../shared/services/city.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-city-item-modify',
  templateUrl: './city-item-modify.component.html',
  styleUrls: ['./city-item-modify.component.css']
})
export class CityItemModifyComponent implements OnInit {

  cityForm!: FormGroup;
  serverErrors!: Array<string>;
  city!: City;
  cityId!: string;
  isLoading!: boolean;
  isNew!: boolean;

  constructor(
    private cityService: CityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cityId = this.route.snapshot.paramMap.get('cityId') || '';
    this.isNew = !this.cityId;
    this.isLoading = !this.isNew;
    this.createForm();
    this.fillForm();
  }

  createForm(): void {
    this.cityForm = new FormGroup({
      name: new FormControl(undefined, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
      slug: new FormControl(undefined, [Validators.required, Validators.minLength(3)]),
      country: new FormControl(undefined, Validators.minLength(3)),
      featuredImage: new FormControl(undefined),
      introText: new FormControl(undefined, Validators.required),
      localCurrency: new FormControl(undefined),
      description: new FormControl(undefined),
      isActive: new FormControl(undefined, Validators.required),
    });
  }

  fillForm(): void {
    if (!this.isNew) {
      // TODO: Remove mock timeout (used to test Loader gif)
      setTimeout(() => {
        this.cityService.getCityById(this.cityId)
          .subscribe(
            (res) => {
              this.city = res;
              this.cityForm.get('name')?.setValue(res.name);
              this.cityForm.get('slug')?.setValue(res.slug);
              this.cityForm.get('country')?.setValue(res.country);
              this.cityForm.get('featuredImage')?.setValue(res.featuredImage);    
              this.cityForm.get('introText')?.setValue(res.introText);
              this.cityForm.get('localCurrency')?.setValue(res.localCurrency);
              this.cityForm.get('description')?.setValue(res.description);
              this.cityForm.get('isActive')?.setValue(res.isActive);
            },
            (err) => {
              /* FIXME: 
              Is there is a better way to redirect to NotFound then pointing to a non-existing route? 
              Use case: User changed mongo id in urlPath to an invalid one */
              this.router.navigate(['city-not-found'], { relativeTo: this.route.parent }); 
            });
      this.isLoading = false
      }, LOADER_TIME);
    } else { 
      this.cityForm?.reset();
      this.cityForm.get('visibility')?.setValue(true);
    }      
  }

  saveCity(): void {
    const city = this.cityForm.getRawValue() as City;
    this.isNew ? this.saveNew(city) : this.saveModified(city);
  }

  saveNew(data: City): void {
    const newCity: City = data;
    this.cityService.createCity(newCity)
      .subscribe(
        (res) => {
          newCity.id = res.id;
          console.warn('New City created', res); // FIXME: Remove
          // TODO: Reset form & show success message || redirect to list
          this.serverErrors = []; 
        }, 
        (err) => {
          this.serverErrors = err.error.message;
        });
  }

  saveModified(data: City): void {
    const modifiedCity: City = data;
    modifiedCity.id = this.cityId;
    this.cityService.updateCity(modifiedCity)
      .subscribe(
        (res) => {
          console.warn('City was updated', res); // FIXME: Remove
          // TODO: Reset form & show success message || redirect to list
          this.serverErrors = []; 
        },
        (err) => {
          this.serverErrors = err.error.message;
        });
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
