export interface City {
    id: string;
    name: string;
    slug: string;
    country: string;
    featuredImage: string;
    description: string;
    isActive: boolean;
    createdAt: Date;
    modifiedAt: Date;
    // https://mongoosejs.com/docs/schematypes.html
    // https://stackoverflow.com/questions/22244421/how-to-create-mongoose-schema-with-array-of-object-ids
    // https://stackoverflow.com/questions/59349305/populate-in-nodejs-with-type-schema-types-objectid-return-null

    // https://stackoverflow.com/questions/50980042/convert-string-array-into-object-id-array
    // https://stackoverflow.com/questions/70315483/mongoose-nested-objectid-array-validation-dto
    // https://github.com/nestjs/swagger/issues/1112
}
