export enum LandmarkFormTooltips {
    // TODO: TBD text and implement later
    NAME = `Officially used name for the landmark. Example: 'Eiffel Tower'`,
    SLUG = 'Should contain a user friendly url. Example: eiffel-tower',
    DESC = 'Plain text description for the landmark.',
    FEE = `0 indicates 'Free entrance', >0 indicates 'Paid entrance' value`, // <0 for unknown?
}

export enum Placeholders {
    CITY_IMAGE = '/assets/images/placeholder-thumb-city.png',
    LANDMARK_IMAGE = '/assets/images/placeholder-thumb-landmark.jpg'
}

export enum UserRole {
    User = 'user',
    Admin = 'admin',
}
