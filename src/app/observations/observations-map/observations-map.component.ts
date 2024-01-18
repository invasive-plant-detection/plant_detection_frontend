import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ObservationModel} from "../../model/observation.model";

@Component({
  selector: 'app-observations-map',
  templateUrl: './observations-map.component.html',
  styleUrl: './observations-map.component.css'
})
export class ObservationsMapComponent implements OnInit {
  observations: ObservationModel[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getObservations().subscribe((value) => {
      this.observations = value;
    }, error => {
        console.error(error);
    })
  }
}
