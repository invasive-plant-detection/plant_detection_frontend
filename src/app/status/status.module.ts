import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatusPageComponent} from './status-page/status-page.component';
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";


@NgModule({
  declarations: [
    StatusPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: StatusPageComponent}]),
    MatCardModule
  ]
})
export class StatusModule { }
