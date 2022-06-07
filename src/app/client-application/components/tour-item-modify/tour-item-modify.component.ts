import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TourService } from 'src/app/shared/services/tour.service';
import { Tour } from './../../../shared/models/tour.model';

@Component({
  selector: 'app-tour-item-modify',
  templateUrl: './tour-item-modify.component.html',
  styleUrls: ['./tour-item-modify.component.css']
})
export class TourItemModifyComponent implements OnInit, OnChanges {

  @Input() tour!: Tour;
  @Input() isLoading!: boolean;
  @Input() isNew: boolean = true; // FIXME: Shouldnt be initialized here, comes from parent
  
  tourForm!: FormGroup;
  serverErrors!: Array<string>;

  constructor(
    private router: Router,
    private tourService: TourService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(): void {
    this.fillForm();
  }

  createForm(): void {
    this.tourForm = new FormGroup({
      name: new FormControl(undefined, [Validators.required]),
      tourDate: new FormControl(undefined, Validators.required), 
      startingLocation: new FormControl(undefined, Validators.required),
      tourNotes: new FormControl(undefined),
      // userId: new FormControl(undefined), // TODO: Extract dynamically, not with input
    });
  }

  fillForm(): void {
    if (this.tour) {
      this.tourForm.get('name')?.setValue(this.tour.name);
      this.tourForm.get('tourDate')?.setValue(this.tour.tourDate);
      this.tourForm.get('startingLocation')?.setValue(this.tour.startingLocation);
      this.tourForm.get('tourNotes')?.setValue(this.tour.tourNotes);
    } 
  }

  saveTour(): void {
    this.tourForm.disable();
    const tour = this.tourForm.getRawValue() as Tour;
    tour.tourDate = new Date(tour.tourDate); 
    this.isNew ? this.saveNew(tour) : this.saveModified(tour);
  }

  saveNew(data: Tour): void {
    let userId: string = '';
    const userData = localStorage.getItem('userData');
    if (userData) {
      userId = JSON.parse(userData).id; // FIXME: Rethink if better solution for userId extraction is needed 
    } 
    const newTour: Tour = { ...data, userId };
    console.error('"NEW TOUR" DATA PASSED', newTour, 'localStorage id', userId); // FIXME: Remove later

    this.tourService.createTour(newTour)
      .subscribe(
        (createdTour) => {
          newTour.id = createdTour.id;
          this.clearFormAndGoBack();
        }, 
        (errorResponse) => {
          this.serverErrors = errorResponse.error.message;
          this.tourForm.enable();
        });
  }

  saveModified(data: Tour): void {
    const modifiedTour: Tour = data;
    modifiedTour.id = this.tour.id;
    this.tourService.updateTour(modifiedTour)
      .subscribe(
        (updatedTour) => {
          this.clearFormAndGoBack();
        },
        (errorResponse) => {
          this.serverErrors = errorResponse.error.message;
          this.tourForm.enable();
        });
  }

  clearFormAndGoBack(): void {
    this.tourForm.reset();
    this.serverErrors = []; 
    this.router.navigateByUrl(`portal/my-tours`);
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
}
