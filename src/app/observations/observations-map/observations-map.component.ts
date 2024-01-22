import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ObservationModel} from "../../model/observation.model";
import * as L from 'leaflet';
import {LocationService} from "../../services/location.service";

@Component({
    selector: 'app-observations-map',
    templateUrl: './observations-map.component.html',
    styleUrl: './observations-map.component.css'
})
export class ObservationsMapComponent implements OnInit {
    observations: ObservationModel[] = [];
    private map!: L.Map;

    constructor(private apiService: ApiService, private locationService: LocationService) {
    }

    ngOnInit(): void {
        this.initMap();
        this.loadObservations();
    }

    loadObservations(): void {
        this.apiService.getObservations().subscribe((value) => {
            this.observations = value;
            this.addObservationsToMap();
        }, error => {
            console.error(error);
        });
    }

    initMap(): void {
        this.locationService.getCurrentLocation().then(data => {
            this.map = L.map('map').setView([data.latitude, data.longitude], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.map);
        });
    }

    private addObservationsToMap(): void {
        this.observations.forEach(observation => {
            L.marker([observation.latitude, observation.longitude])
                .addTo(this.map)
                .bindPopup(`Prediction: ${observation.prediction}`);
        });
    }
}
