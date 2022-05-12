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

  register(data: User): Observable<User> {
    const apiUrl = `${baseApiUrl}/users`;
    return this.http.post<User>(apiUrl, data, { headers: this.headers });
  }

  login(user: User): Observable<User> {
    return this.http.post<any>(`${baseApiUrl}/auth/login`, user).pipe(
      map(res => {
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

  getUserProfile(username?: any): Observable<any> {
    let api = `${baseApiUrl}/profile`; // /${username}
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res) => {
        return res || {};
      }),
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}, Message: ${error.message}`;
      // FIXME: Find a solution for this:
      if (error.status === 401) {
        console.error('Token needs to be refreshed'); 
        localStorage.removeItem('access_token');
      }
    }
    return throwError(msg);
  }

  logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user'); // TODO: Follow whatever path is determined in login
    if (!this.getToken()) {
      this.router.navigate(['login']);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    return this.getToken() ? true : false;
  }
}
