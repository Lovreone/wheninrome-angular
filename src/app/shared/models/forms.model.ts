import { FormControl, FormGroup } from '@angular/forms';

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

export interface LoginForm {
    email: FormControl<string|null>,
    password: FormControl<string|null>,
}

export interface RegisterForm {
    firstName: FormControl<string|null>,
    lastName: FormControl<string|null>,
    email: FormControl<string|null>,
    username: FormControl<string|null>,
    passGroup: FormGroup<PassGroup>
}

export interface PassGroup {
    enterPassword: FormControl<string|null>,
    repeatPassword: FormControl<string|null>
}

export interface UserItemModifyForm {
    firstName: FormControl<string|null>,
    lastName: FormControl<string|null>,
    email: FormControl<string|null>,
    username: FormControl<string|null>,
    isActive: FormControl<boolean|null>,
}
