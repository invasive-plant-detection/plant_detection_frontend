import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const DEFAULT_PATH = 'about';

const routes: Routes =
  [
    {
      path: '',
      redirectTo: DEFAULT_PATH,
      pathMatch: 'full'
    },
    {
      path: DEFAULT_PATH,
      loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
    },
    {
      path: '**',
      redirectTo: ''
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
