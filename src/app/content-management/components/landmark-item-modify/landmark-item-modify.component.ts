import { LandmarkService } from '../../../shared/services/landmark.service';
import { ActivatedRoute } from '@angular/router';
import { Landmark } from '../../../shared/models/landmark.model';

import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-landmark-item-modify',
  templateUrl: './landmark-item-modify.component.html',
  styleUrls: ['./landmark-item-modify.component.css']
})
export class LandmarkItemModifyComponent implements OnInit {

  @Input() landmarkId!: string;
  @Input() isNew!: boolean;

  landmarkForm!: FormGroup;
  isLoading!: boolean;

  constructor(
    private landmarkService: LandmarkService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const extractedId = this.route.snapshot.paramMap.get('landmarkId');
    this.landmarkId = extractedId ? extractedId : '';
    this.isNew = !this.landmarkId;
    this.isLoading = !this.isNew;

    this.createForm();
    this.fillForm();
  }

  createForm(): void {
    this.landmarkForm = new FormGroup({
      name: new FormControl(undefined, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(undefined),
      entranceFee: new FormControl(undefined)
    });
  }

  fillForm(): void {
    if (!this.isNew) {
      // TODO: Remove mock timeout (used to test Loader gif)
      setTimeout(() => {
        this.landmarkService.getLandmarkById(this.landmarkId)
          .subscribe(res => {
            this.landmarkForm.get('name')?.setValue(res.name);
            this.landmarkForm.get('description')?.setValue(res.description);
            this.landmarkForm.get('entranceFee')?.setValue(res.entranceFee);
          });
      this.isLoading = false
      }, 1000);
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
      .subscribe((res) => {
        newLandmark.id = res.id;
        console.warn('New Landmark created', res); // FIXME: Remove
        // TODO: Reset form & show success message || redirect to list
      });
  }

  saveModified(data: Landmark): void {
    const modifiedLandmark: Landmark = data;
    modifiedLandmark.id = this.landmarkId;
    this.landmarkService.updateLandmark(modifiedLandmark)
      .subscribe((res) => {
        console.warn('Landmark was updated', res); // FIXME: Remove
        // TODO: Reset form & show success message || redirect to list
      });
  }

  /** Getters used for cleaner access from Template */
  get name() { return this.landmarkForm.get('name'); }
  get description() { return this.landmarkForm.get('description'); }
  get entranceFee() { return this.landmarkForm.get('entranceFee'); }
}
