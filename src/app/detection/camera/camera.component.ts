import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {PredictionResponseModel} from "../../model/prediction-response.model";
import {LocationService} from "../../services/location.service";

@Component({
    selector: 'camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.css']
})

export class CameraComponent implements AfterViewInit {

    FRONT_CAMERA = 'user';
    BACK_CAMERA = 'environment';

    showVideo: boolean = true;
    predictionResult?: PredictionResponseModel;

    @ViewChild('videoElement') videoElement: ElementRef = new ElementRef(null);
    currentFacingMode: string = this.FRONT_CAMERA;

    constructor(private readonly apiService: ApiService, private locationService: LocationService) {
    }

    ngAfterViewInit(): void {
        this.startCamera(this.currentFacingMode);
    }

    startCamera(facingMode: string): void {
        if (navigator.mediaDevices.getUserMedia) {
            const constraints = {
                video: {facingMode: facingMode}
            };

            navigator.mediaDevices.getUserMedia(constraints)
                .then(stream => {
                    const video: HTMLVideoElement = this.videoElement.nativeElement;
                    video.srcObject = stream;
                })
                .catch(err => {
                    console.error('Error accessing the camera', err);
                });
        } else {
            alert('Sorry, your browser does not support accessing the camera');
        }
    }

     async predict(): Promise<void> {
        const image = this.captureImage();
        const location = await this.locationService.getCurrentLocation();
        this.apiService.predict({base64Image: image, longitude: location.longitude, latitude: location.latitude})
            .subscribe((response) => {
                this.predictionResult = response;
                this.showVideo = false;
                console.log('Prediction result:', response);
            });
    }

    captureImage(): string {
        const video: HTMLVideoElement = this.videoElement.nativeElement;
        const canvas: HTMLCanvasElement = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL('image/png');
        const imageOnlyBase64 = dataUrl.split(';base64,').pop();
        return <string>imageOnlyBase64;
    }

    flipCamera(): void {
        this.currentFacingMode = (this.currentFacingMode === this.FRONT_CAMERA) ? this.BACK_CAMERA : this.FRONT_CAMERA;
        this.videoElement.nativeElement.srcObject.getTracks().forEach((track: MediaStreamTrack) => track.stop());
        this.startCamera(this.currentFacingMode);
    }

    resetCamera(): void {
        this.showVideo = true;
        this.startCamera(this.currentFacingMode);
    }
}
