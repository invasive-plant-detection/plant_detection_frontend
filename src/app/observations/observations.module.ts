import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ObservationsMapComponent} from './observations-map/observations-map.component';
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    ObservationsMapComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: ObservationsMapComponent}])
  ]
})
export class ObservationsModule { }
