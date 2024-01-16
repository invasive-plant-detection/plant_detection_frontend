import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavigationComponent} from './navigation/navigation.component';
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    NavigationComponent
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    NavigationComponent
  ]
})
export class UtilModule {
}
