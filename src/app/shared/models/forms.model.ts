import { FormControl } from '@angular/forms';

export interface ProfileModifyForm {
    firstName: FormControl<string|null>,
    lastName: FormControl<string|null>,
    email: FormControl<string|null>,
    username: FormControl<string|null>
}

export interface TourItemModifyForm {
    name: FormControl<string|null>,
    tourDate: FormControl<string|null>,
    startingLocation: FormControl<string|null>,
    tourNotes: FormControl<string|null>,
    cityId: FormControl<string|null>
}
