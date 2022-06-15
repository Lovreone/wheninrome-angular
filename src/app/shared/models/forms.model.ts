import { FormControl } from '@angular/forms';

export interface ProfileModifyForm {
    firstName: FormControl<string|null>,
    lastName: FormControl<string|null>,
    email: FormControl<string|null>,
    username: FormControl<string|null>
}
