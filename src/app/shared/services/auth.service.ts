import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { baseApiUrl } from 'src/utils/config';
import { User } from './../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) { }

    login(username: string, password: string): Observable<User> {
        return this.http.post<any>(`${baseApiUrl}/auth/login`, { username, password }).pipe(
          map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.access_token) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user));
              //this.currentUserSubject.next(user);
            }
            return user;
          })
        );
    }

    // TODO: Implement
	//$ curl -X POST http://localhost:3000/auth/login -d '{"username": "johnwayne", "password": "changeme"}' -H "Content-Type: application/json"

	//$ curl http://localhost:3000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
    // getProfile(): any {
    //     return this.http.get(`${baseApiUrl}/profile`, {});
    // }
}