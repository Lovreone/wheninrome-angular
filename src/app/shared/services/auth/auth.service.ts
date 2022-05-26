import { Router } from '@angular/router';
import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { baseApiUrl } from 'src/utils/config';
import { User, UserLoginData, UserRegisterData } from './../../models/user.model';
import { UserRole } from 'src/utils/enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');
  user = new BehaviorSubject<User | null>(null); 
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    public router: Router
  ) { }

  register(data: UserRegisterData): Observable<User> {
    return this.http
      .post<User>(
        `${baseApiUrl}/auth/register`, 
        data, 
        {headers: this.headers}
      )
      .pipe(catchError(this.handleError));
  }

  login(data: UserLoginData): Observable<User> {
    return this.http
      .post<any>(
        `${baseApiUrl}/auth/login`,
        data)
      .pipe(
        tap((res) => {
          this.handleAuth(
            res.access_token, 
            res.tokenIssuedAt, 
            res.tokenExpiresAt, 
            res.user
          );
        }),
        map((res) => { // Not used atm
          return res.user;
        }),
        catchError(this.handleError)
      );
  }

  /* Keeps user state between page refreshes */
  autoLogin(): void {
    const userDataSnapshot = localStorage.getItem('userData');
    if (!userDataSnapshot) {
      return;
    }
    const userData: {
      id: string,
      email: string,
      firstName: string,
      lastName: string,
      roles: UserRole[],
      _token: string,
      _tokenExpirationDate: string,
    } = JSON.parse(userDataSnapshot);

    const loadedUser: User = new User(
      userData.id,
      userData.email,
      userData.firstName,
      userData.lastName,
      undefined,
      userData._token,
      new Date(userData._tokenExpirationDate),
      userData.roles
    );
    if (loadedUser.token) { 
      // If we have a valid token auto-login user between page refreshes
      this.user.next(loadedUser); 

      // Starting up auto-logout timer when user logs in
      const expirationDuration = 
        new Date(userData._tokenExpirationDate).getTime() - 
        new Date().getTime();
      this.autoLogout(expirationDuration); 
    }
  }

  logout(): void {
    this.user.next(null);
    localStorage.removeItem('userData');
    this.router.navigate(['login']);

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  // Sets and manages the timer for user auto-logout
  autoLogout(expirationDurationMs: number): void {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDurationMs);
    console.error('Token expires in (seconds): ', expirationDurationMs / 1000); // TODO: Remove later
  }

  // TODO: Migrate to user service
  getUserProfile(): Observable<any> {
    return this.http
      .get(
        `${baseApiUrl}/users/profile`,
        {headers: this.headers}
      )
      .pipe(
        map((res) => {
          return res || {};
        }),
        catchError(this.handleError)
      );
  }

  private handleAuth(token: string, issuedAt: number, expiresAt: number, userData: User): void {
    const tokenExpiryMs = (expiresAt - issuedAt) * 1000; 
    const tokenExpiryDate = new Date(new Date().getTime() + tokenExpiryMs);
    const user = new User(
      userData.id,
      userData.email,
      userData.firstName,
      userData.lastName,
      undefined,
      token,
      tokenExpiryDate,
      userData.roles
    );
    // Setting/Emmitting the currently logged-in user
    this.user.next(user);
    // Persisting data to keep user between page-refreshes
    localStorage.setItem('userData', JSON.stringify(user));
    // Starting auto-logout Timer as soon as user logs in
    this.autoLogout(tokenExpiryMs);
  }

  private handleError(errorResponse: HttpErrorResponse): Observable<any> {
    let errorMessage = ['An unknown error has occured!'];
    if (!errorResponse.error || !errorResponse.error.error) {  
      return throwError(errorMessage);
    } else {
      errorMessage = errorResponse.error.message;  
    }
    return throwError(errorMessage);
  }
}
