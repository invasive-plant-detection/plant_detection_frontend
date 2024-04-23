import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {ObservationModel} from "../../model/observation.model";
import * as L from 'leaflet';
import {LocationService} from "../../services/location.service";
import {CoordinatesModel} from "../../model/coordinates.model";

@Component({
    selector: 'app-observations-map',
    templateUrl: './observations-map.component.html',
    styleUrl: './observations-map.component.css'
})
export class ObservationsMapComponent implements OnInit {
    observations: ObservationModel[] = [];
    private map!: L.Map;

    constructor(private apiService: ApiService, private locationService: LocationService) { }

    ngOnInit(): void {
        this.initMap();
    }

    async initMap(): Promise<void> {
        try {
            const data = await this.getUserCoordinates();
            this.map = L.map('map').setView([data.latitude, data.longitude], 15);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors'
            }).addTo(this.map);

            this.loadObservations();
        } catch (error) {
            console.error('Failed to initialize the map:', error);
        }
    }

    async getUserCoordinates(): Promise<CoordinatesModel> {
        let data;
        try {
            data = await this.locationService.getCurrentLocation();
        } catch (error) {
            console.error('Error obtaining current location:', error);
            data = { latitude: 47.49995, longitude: 8.72413 };
        }
        return data;
    }

    loadObservations(): void {
        this.apiService.getObservations().subscribe({
            next: (values: ObservationModel[]) => {
                this.observations = values;
                this.addObservationsToMap();
            },
            error: (error) => console.error(error)
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