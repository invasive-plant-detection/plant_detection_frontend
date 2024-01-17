import {Injectable} from '@angular/core';
import {CoordinatesModel} from "../model/coordinates.model";

@Injectable({
    providedIn: 'root'
})
export class LocationService {

    constructor() {
    }

    getCurrentLocation(): Promise<CoordinatesModel> {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        if (position) {
                            let latitude = position.coords.latitude;
                            let longitude = position.coords.longitude;

                            const location: CoordinatesModel = {
                                latitude,
                                longitude,
                            };
                            resolve(location);
                        }
                    },
                    (error) => {
                        reject(new Error('Geolocation is not supported by this browser.' + error.message))
                    });
            } else {
                reject(new Error('Geolocation is not supported by this browser.'));
            }
        });
    }
}
