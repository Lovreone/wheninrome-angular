import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { baseApiUrl } from 'src/utils/config';
import { City } from './../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  
  private apiUrl = `${baseApiUrl}/cities`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(this.apiUrl);
  }

  public getActiveCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.apiUrl}/active`);
  }

  public getCityById(id: string): Observable<City> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<City>(url);
  }
  
  public getCityBySlug(slug: string): Observable<City> {
    const url = `${this.apiUrl}/by-slug/${slug}`;
    return this.http.get<City>(url);
  }

  public createCity(data: City): Observable<City> {
    return this.http.post<City>(this.apiUrl, data, this.httpOptions);;
  }

  public updateCity(data: City): Observable<City> {
    const url = `${this.apiUrl}/${data.id}`;
    return this.http.patch<City>(url, data, this.httpOptions);
  }
  
  public deleteCity(data: City): Observable<boolean> {
    const url = `${this.apiUrl}/${data.id}`;
    return this.http.delete(url).pipe(
      map(() => true), 
      catchError(() => of(false))
    );
  }
}
