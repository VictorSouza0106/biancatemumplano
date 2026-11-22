import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'proposta/opportunity',
        loadComponent: () => import('./core/pages/proposal-opportunity/proposal-opportunity').then(m => m.ProposalOpportunity)
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
