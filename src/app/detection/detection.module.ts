import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictComponent } from './predict/predict.component';
import {RouterModule, Routes} from "@angular/router";
import {MatCardModule} from "@angular/material/card";
import { CameraComponent } from './camera/camera.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    PredictComponent,
    CameraComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: PredictComponent}]),
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class DetectionModule { }
