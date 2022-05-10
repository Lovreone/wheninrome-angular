import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseApiUrl } from 'src/utils/config';
import { User } from './../../models/user.model';

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

  // Registration
  signUp(user: User): Observable<any> {
    let api = `${baseApiUrl}/users`;
    return this.http.post(api, user).pipe(catchError(this.handleError));
  }

  login(user: User): Observable<User> {
    return this.http.post<any>(`${baseApiUrl}/auth/login`, user).pipe(
      map(res => {
        console.warn('SIGNIN RES', res); // TODO: REMOVE
        /* On successful Login there's a jwt token in the response */
        if (res && res.access_token) {
          /* Storing user details and token in local storage to keep user logged in between page refreshes */
          localStorage.setItem('access_token', res.access_token);
          localStorage.setItem('user', JSON.stringify(res.user)); // TODO: Determine which user data we need in here
        }
        return res.user;
      })
    )
  }



  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
    if (!this.getToken()) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(username?: any): Observable<any> {
    let api = `${baseApiUrl}/profile`; // /${username}
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

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }
}
