import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { baseApiUrl } from 'src/utils/config';
import { Landmark } from './../models/landmark.model';

@Injectable({
  providedIn: 'root'
})
export class LandmarkService {
  // https://rxjs.dev/deprecations/to-promise

  private apiUrl = `${baseApiUrl}/landmarks`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  // TODO: post getLandmarks(city, category);

  public getLandmarks(): Observable<Landmark[]> {
    return this.http.get<Landmark[]>(this.apiUrl);
  }

  public getLandmarksByCity(cityId: string): Observable<Landmark[]> {
    const url = `${this.apiUrl}/by-city/${cityId}`;
    return this.http.get<Landmark[]>(url);
  }

  public getLandmarkById(id: string): Observable<Landmark> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Landmark>(url);
  }

  public getLandmarkBySlug(slug: string): Observable<Landmark> {
    const url = `${this.apiUrl}/by-slug/${slug}`;
    return this.http.get<Landmark>(url);
  }

  public createLandmark(data: Landmark): Observable<Landmark> {
    return this.http.post<Landmark>(this.apiUrl, data, this.httpOptions);;
  }

  public updateLandmark(data: Landmark): Observable<Landmark> {
    const url = `${this.apiUrl}/${data.id}`;
    return this.http.patch<Landmark>(url, data, this.httpOptions);
  }

  public deleteLandmark(data: Landmark): Observable<boolean> {
    const url = `${this.apiUrl}/${data.id}`;
    return this.http.delete(url).pipe(
      map(() => true), 
      catchError(() => of(false))
    );
  }
}
