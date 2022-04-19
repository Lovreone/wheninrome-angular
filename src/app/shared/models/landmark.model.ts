export interface Landmark {
    id: string;
    name: string;
    slug: string;
    description: string;
    entranceFee: number;
    officialWebsite?: string;
    featuredImage?: string;
    howToArrive?: string;
    workingDays?: string;
    workingHours?: string;
    coordinates?: string;
    city: NestedCity;
    isActive: boolean;
    createdAt?: Date;
    modifiedAt?: Date;
}

export interface NestedCity {
    id: string;
    name: string;
    isActive: boolean;
}