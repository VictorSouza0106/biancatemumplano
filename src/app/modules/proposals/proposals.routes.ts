import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'opportunity',
        loadComponent: () =>
            import('./proposals/opportunity/opportunity.component').then(
                m => m.OpportunityComponent
            )
    }
];
