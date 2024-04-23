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
    private icon!: L.Icon;

    constructor(private apiService: ApiService, private locationService: LocationService) { }

    ngOnInit(): void {
        this.initMap().then(() => {});
        this.defineIcon();
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
            L.marker([observation.latitude, observation.longitude], { icon: this.icon })
                .addTo(this.map)
                .bindPopup(`Prediction: ${observation.prediction}`);
        });
    }

    private defineIcon(): void {
        const leafletImagesUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/';
        this.icon = L.icon({
            iconUrl: `${leafletImagesUrl}marker-icon.png`,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowUrl: `${leafletImagesUrl}marker-shadow.png`,
            shadowSize: [41, 41]
        });
    }
}