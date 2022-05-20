import { UserRole } from 'src/utils/enum';

// TODO: Reevaluate which properties are optional and which ar not (Contexts: Register,Login,ServerResponse)
export class User {
    constructor(
        public id?: string | undefined,
        public username?: string,
        public email?: string,
        public firstName?: string | undefined,
        public lastName?: string | undefined,
        public password?: string | undefined,
        public roles?: UserRole[],
        public isActive?: boolean,
        public createdAt?: Date,
        public modifiedAt?: Date,
        private _token?: string,
        private _tokenExpirationDate?: Date,
    ) {}

    get fullName(): string {
        return this.firstName!.concat(' ', this.lastName!);
    }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            // Token expiry doesnt exist OR Token has expired
            return null;
        }
        return this._token;
    }

    get tokenExpirationDate() {
        return this._tokenExpirationDate;
    }
}

export interface UserRegisterData {
    email: string;
    password: string;
    username: string;
    firstName: string;
    lastName: string;
}

export interface UserLoginData {
    email: string;
    password: string;
}
