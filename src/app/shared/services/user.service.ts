import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './../models/user.model';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private http: HttpClient) { }

    private apiUrl = 'http://localhost:3000/users';
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type' : 'application/json'
      })
    };

    public registerNewUser(data: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, data, this.httpOptions);;
    }
}