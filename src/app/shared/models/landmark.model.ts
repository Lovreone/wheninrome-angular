export interface Landmark {
    id: string;
    name: string;
    slug: string;
    description: string;
    entranceFee: number;
    city: NestedCity;
}

export interface NestedCity {
    id: string;
    name: string;
    isActive: boolean;
}