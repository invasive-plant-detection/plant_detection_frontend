import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {HealthResponseModel} from "../model/health-response.model";
import {ObservationModel} from "../model/observation.model";

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private readonly API_URL = 'http://localhost:8080/';

    constructor(private http: HttpClient) {
    }

    healthCheck(): Observable<HealthResponseModel> {
        return this.http.get<HealthResponseModel>(this.API_URL + 'actuator/health').pipe(
            catchError(error => {
                return throwError(() => error)
            }));
    }

    getObservations(): Observable<ObservationModel[]> {
        return this.http.get<ObservationModel[]>(this.API_URL + 'observations').pipe(
            catchError(error => {
                return throwError(() => error)
            }));
    }
}
