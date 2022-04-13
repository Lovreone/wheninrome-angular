export enum LandmarkFormTooltips {
    // TODO: TBD text and implement later
    NAME = `Officially used name for the landmark. Example: 'Eiffel Tower'`,
    SLUG = 'Should contain a user friendly url. Example: eiffel-tower',
    DESC = 'Plain text description for the landmark.',
    FEE = `0 indicates 'Free entrance', >0 indicates 'Paid entrance' value`, // <0 for unknown?
}

export const LOADER_TIME = 300;

// Helper interface for Select box options
export interface SelectOption {
    id: string;
    value: string
}
