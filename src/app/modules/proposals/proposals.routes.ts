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
    },
    {
        path: 'queren-larissa',
        loadComponent: () =>
            import('./proposals/queren-larissa/queren-larissa.component').then(
                m => m.QuerenLarissaComponent
            )
    }
];
