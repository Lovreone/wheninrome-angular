export interface City {
    id: string;
    name: string;
    slug: string;
    country: string;
    image: string;
    description: string;
    landmark: Array<Object>; // FIXME: Array of mongo ObjectId's
}
