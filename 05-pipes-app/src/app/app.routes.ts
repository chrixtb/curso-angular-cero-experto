import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'basic',
        title: 'Pipes basicos',
        loadComponent: () => import('./pages/basic-page/basic-page.component'),
    },
    {
        path: 'numbers',
        title: 'Pipes de números',
        loadComponent: () => import('./pages/numbers-page/numbers-page.component'),
    },
    {
        path: 'uncommon',
        title: 'Pipes inusuales',
        loadComponent: () => import('./pages/uncommon-page/uncommon-page.component'),
    },
    {
        path: 'custom',
        title: 'Pipes personalizados',
        loadComponent: () => import('./pages/custom-page/custom-page.component'),
    },
    {
        path: '**',
        redirectTo: 'basic',
    }


];
