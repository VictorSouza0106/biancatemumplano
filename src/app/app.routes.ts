import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'proposta',
        loadChildren: () =>
            import('./modules/proposals/proposals.routes').then(m => m.routes)
    },
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
            import('./modules/home/photography/photography.component').then(
                m => m.PhotographyComponent
            )
    },
    {
        path: '**',
        redirectTo: ''
    }
];
