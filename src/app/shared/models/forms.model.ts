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

export interface CityItemModifyForm {
    name: FormControl<string|null>,
    slug: FormControl<string|null>,
    country: FormControl<string|null>,
    featuredImage: FormControl<string|null>,
    introText: FormControl<string|null>,
    localCurrency: FormControl<string|null>,
    description: FormControl<string|null>,
    isActive: FormControl<boolean|null>,
}

export interface LandmarkItemModifyForm {
    name: FormControl<string|null>,
    slug: FormControl<string|null>,
    introText: FormControl<string|null>,
    description: FormControl<string|null>,
    entranceFee: FormControl<number|null>,
    officialWebsite: FormControl<string|null>,
    featuredImage: FormControl<string|null>,
    howToArrive: FormControl<string|null>,
    workingDays: FormControl<string|null>,
    workingHours: FormControl<string|null>,
    coordinates: FormControl<string|null>,
    city: FormControl<string|null>,
    isActive: FormControl<boolean|null>
}
