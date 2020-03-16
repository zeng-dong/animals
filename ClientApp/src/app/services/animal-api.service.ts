import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnimalsApiError } from '../models/animals-api-error';
import { IResponseData } from '../models/response-data';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimalApiService {
  _baseUrl: string;
  
  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  public loadData$ = (): Observable<IResponseData | AnimalsApiError> => {
    let obs = this.http.get<IResponseData>(this._baseUrl + `api/animals`);
    return obs.pipe(
      catchError(err => this.handleError(err))
    );
  }

  public loadCategorySpecies$ = (category: string): Observable<string[] | AnimalsApiError> => {
    let obs = this.http.get<string[]>(this._baseUrl + `api/animals/category/${category}`);
    return obs.pipe(
      catchError(err => this.handleError(err))
    );
  }

  private handleError(error: Response): Observable<AnimalsApiError> {
    let dataError = new AnimalsApiError();
    dataError.errorNumber = error.status;
    dataError.message = error.statusText;
    dataError.friendlyMessage = "An error occurred retrieving data.";
    return Observable.create(dataError);
  }
}
