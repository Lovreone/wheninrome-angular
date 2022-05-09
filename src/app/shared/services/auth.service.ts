import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseApiUrl } from 'src/utils/config';
import { User } from './../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${baseApiUrl}/users`; // `${baseApiUrl}/register-user`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${baseApiUrl}/auth/login`, user) // `${this.endpoint}/signin`
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['user-profile/' + res.msg._id]);
        });
      });
  }
  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  // User profile
  getUserProfile(id: any): Observable<any> {
    let api = `${baseApiUrl}/profile`; // `${this.endpoint}/user-profile/${id}`
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

 // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }



// login(username: string, password: string): Observable<User> {
//   return this.http.post<any>(`${baseApiUrl}/auth/login`, { username, password }).pipe(
//     map(user => {
//       // login successful if there's a jwt token in the response
//       if (user && user.access_token) {
//         // store user details and jwt token in local storage to keep user logged in between page refreshes
//         localStorage.setItem('currentUser', JSON.stringify(user));
//         //this.currentUserSubject.next(user);
//       }
//       return user;
//     })
//   );
// }

// TODO: Implement
// $ curl -X POST http://localhost:3000/auth/login -d '{"username": "johnwayne", "password": "changeme"}' -H "Content-Type: application/json"

//$ curl http://localhost:3000/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
// getProfile(): any {
//     return this.http.get(`${baseApiUrl}/profile`, {});
// }
}