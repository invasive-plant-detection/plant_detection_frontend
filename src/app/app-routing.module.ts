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
        },
        {
            path: 'observations',
            loadChildren: () => import('./observations/observations.module').then(m => m.ObservationsModule)
        },
        {
            path: 'about',
            loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
        },
        {
            path: 'status',
            loadChildren: () => import('./status/status.module').then(m => m.StatusModule)
        }, {
        path: '**',
        redirectTo: DEFAULT_PATH
    }
    ];

@NgModule({
    imports: [RouterModule.forRoot(routes)], exports: [RouterModule]
})
export class AppRoutingModule {
}
