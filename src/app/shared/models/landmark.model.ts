export interface Landmark {
    id: string;
    name: string;
    slug: string;
    introText: string;
    description: string;
    entranceFee: number;
    officialWebsite?: string|null;
    featuredImage?: string|null;
    howToArrive?: string|null;
    workingDays?: string|null;
    workingHours?: string|null;
    coordinates?: string|null;
    city: NestedCity;
    isActive: boolean;
    createdAt?: Date;
    modifiedAt?: Date;
}

export interface NestedCity {
    id: string;
    name: string;
    slug: string;
    isActive: boolean;
}