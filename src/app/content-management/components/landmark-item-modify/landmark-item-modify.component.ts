import { LOADER_TIME } from './../../../../utils/enum';
import { LandmarkService } from '../../../shared/services/landmark.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Landmark } from '../../../shared/models/landmark.model';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landmark-item-modify',
  templateUrl: './landmark-item-modify.component.html',
  styleUrls: ['./landmark-item-modify.component.css']
})
export class LandmarkItemModifyComponent implements OnInit {

  landmarkForm!: FormGroup;
  serverErrors!: Array<string>;
  landmarkId!: string;
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

    this.createForm();
    this.fillForm();
  }

  createForm(): void {
    this.landmarkForm = new FormGroup({
      name: new FormControl(undefined, [Validators.required, Validators.minLength(3)]),
      slug: new FormControl(undefined, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(undefined),
      entranceFee: new FormControl(undefined, [Validators.required, Validators.min(0)])
    });
  }

  fillForm(): void {
    if (!this.isNew) {
      // TODO: Remove mock timeout (used to test Loader gif)
      setTimeout(() => {
        this.landmarkService.getLandmarkById(this.landmarkId)
          .subscribe(
            (res) => {
              this.landmarkForm.get('name')?.setValue(res.name);
              this.landmarkForm.get('slug')?.setValue(res.slug);
              this.landmarkForm.get('description')?.setValue(res.description);
              this.landmarkForm.get('entranceFee')?.setValue(res.entranceFee);
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

  saveLandmark(): void {
    const landmark = this.landmarkForm.getRawValue() as Landmark;
    this.isNew ? this.saveNew(landmark) : this.saveModified(landmark);
  }

  saveNew(data: Landmark): void {
    const newLandmark: Landmark = data;
    this.landmarkService.createLandmark(newLandmark)
      .subscribe(
        (res) => {
          newLandmark.id = res.id;
          console.warn('New Landmark created', res); // FIXME: Remove
          // TODO: Reset form & show success message || redirect to list 
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
  get description() { return this.landmarkForm.get('description'); }
  get entranceFee() { return this.landmarkForm.get('entranceFee'); }
}
