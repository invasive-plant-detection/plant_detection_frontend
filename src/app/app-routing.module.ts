import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const DEFAULT_PATH = 'predict';

const routes: Routes =
  [
    {
      path: '',
      redirectTo: DEFAULT_PATH,
      pathMatch: 'full'
    },
    {
      path: DEFAULT_PATH,
      loadChildren: () => import('./detection/detection.module').then(m => m.DetectionModule)
    },{
      path: 'about',
      loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
    },
    {
      path: '**',
      redirectTo: DEFAULT_PATH
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
