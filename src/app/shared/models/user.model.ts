import { UserRole } from 'src/utils/enum';
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
    roles?: UserRole[];
}
