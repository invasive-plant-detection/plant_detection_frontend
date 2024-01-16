import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PredictionResponseModel} from "../model/prediction-response.model";
import {HealthResponseModel} from "../model/health-response.model";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly API_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  healthCheck(): Observable<HealthResponseModel> {
    return this.http.get<HealthResponseModel>(this.API_URL + 'actuator/health');
  }
}
