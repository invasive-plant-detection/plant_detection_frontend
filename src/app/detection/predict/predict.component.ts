import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {LocationService} from "../../services/location.service";

@Component({
  selector: 'app-predict',
  templateUrl: './predict.component.html',
  styleUrl: './predict.component.css'
})
export class PredictComponent implements OnInit {
  constructor(private apiService: ApiService, private locationService: LocationService) {
  }

  ngOnInit(): void {
    this.apiService.healthCheck().subscribe(data => {
      console.log(data);
    });
    this.locationService.getCurrentLocation().then(data => {
      console.log(data);
    });
  }
}
