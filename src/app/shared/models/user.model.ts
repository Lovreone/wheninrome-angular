export interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive?: boolean;
    createdAt?: Date;
    modifiedAt?: Date;
    roles?: Role[];
}

export enum Role {
    User = 'user',
    Admin = 'admin',
}