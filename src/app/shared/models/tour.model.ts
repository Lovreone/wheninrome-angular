export interface Tour {
    id?: string;
    name: string;
    tourDate: Date; 
    startingLocation: string;
    tourNotes: string;
    userId: string;
    cityId: string;
    createdAt?: Date;
    modifiedAt?: Date;    
}
