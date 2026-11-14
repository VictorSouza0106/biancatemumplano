import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./core/pages/photography/photography').then(m => m.Photography)
    },
    {
        path: '**',
        redirectTo: ''
    }
];
