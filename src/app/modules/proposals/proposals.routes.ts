import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'opportunity',
        loadComponent: () =>
            import('./proposals/opportunity/opportunity.component').then(
                m => m.OpportunityComponent
            )
    },
    {
        path: 'jucimara',
        loadComponent: () =>
            import('./proposals/jucimara/jucimara.component').then(
                m => m.JucimaraComponent
            )
    }
];
