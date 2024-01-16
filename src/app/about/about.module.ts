import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';
import {RouterModule} from "@angular/router";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    AboutComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '', component: AboutComponent}]),
    MatCardModule
  ]
})
export class AboutModule { }
