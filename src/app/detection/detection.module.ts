import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PredictComponent } from './predict/predict.component';
import {RouterModule, Routes} from "@angular/router";

@NgModule({
  declarations: [
    PredictComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: PredictComponent}])
  ]
})
export class DetectionModule { }
